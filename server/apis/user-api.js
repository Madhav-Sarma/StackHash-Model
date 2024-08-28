const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
// Secret key for JWT (in a real application, use environment variables)
const JWT_SECRET = process.env.JWT_SECRET;

// Controller functions
const getUsers = async (db) => await db.collection('users').find().toArray();
const getUserById = async (db, id) => await db.collection('users').findOne({ _id: new ObjectId(id) });
const getUserByUsername = async (db, username) => await db.collection('users').findOne({ username: username });
const addUser = async (db, user) => await db.collection('users').insertOne(user);
const updateUser = async (db, id, user) => await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: user });
const deleteUser = async (db, id) => await db.collection('users').deleteOne({ _id: new ObjectId(id) });

// Routes
router.get('/', async (req, res) => {
    try {
        const users = await getUsers(req.db);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await getUserById(req.db, req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = req.body;
        const result = await addUser(req.db, user);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const user = req.body;
        const result = await updateUser(req.db, req.params.id, user);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteUser(req.db, req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// User Registration Route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;  // Add email to destructuring

        // Check if user already exists by username or email
        const existingUser = await getUserByUsername(req.db, username);
        const existingEmail = await req.db.collection('users').findOne({ email: email }); // Check if email already exists

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Set role as 'user' by default
        const role = 'user';

        // Create new user
        const newUser = { username, email, password: hashedPassword, role };  // Include role attribute
        const result = await addUser(req.db, newUser);

        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});


// User Login Route
// User Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await getUserByUsername(req.db, username);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check role of the user
        const role = user.role;
        if (role !== 'admin' && role !== 'user') {
            return res.status(400).json({ error: 'Invalid user role' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // Return token and user information including role
        res.json({ message: 'Login successful', token, role });
    } catch (err) {
        res.status(500).json({ error: 'Failed to login' });
    }
});


module.exports = router;
