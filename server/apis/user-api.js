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
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Optional: Additional email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Optional: Password strength validation (e.g., minimum length)
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        // Check if user already exists by username or email
        const existingUser = await getUserByUsername(req.db, username);
        const existingEmail = await req.db.collection('users').findOne({ email });

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
        const newUser = { username, email, password: hashedPassword, role };

        // Insert new user into the database
        const result = await addUser(req.db, newUser);

        // Check if insertion was successful
        if (!result.insertedId) {
            return res.status(500).json({ error: 'Failed to register user' });
        }

        // Successfully registered
        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (err) {
        console.error("Registration Error:", err);  // Log the exact error for debugging
        res.status(500).json({ error: 'An unexpected error occurred during registration' });
    }
});





// User Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await getUserByUsername(req.db, username);
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Correct: Compare plain password with hashed password from DB
        const isMatch = await bcrypt.compare(password, user.password);  // No rehashing here
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },  // Include user role in token payload
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return token and user information including role
        res.json({ message: 'Login successful', token, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to login' });
    }
});






module.exports = router;
