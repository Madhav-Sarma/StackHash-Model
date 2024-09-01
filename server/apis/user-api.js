const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to check if the user has the required role
const checkRole = (requiredRoles) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = decoded;

    // Check if the user's role is included in the required roles
    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }

    next();
  });
};

// Controller functions
const getUsers = async (db) => await db.collection('users').find().toArray();
const getUserById = async (db, id) => await db.collection('users').findOne({ _id: new ObjectId(id) });
const getUserByUsername = async (db, username) => await db.collection('users').findOne({ username: username });
const addUser = async (db, user) => await db.collection('users').insertOne(user);
const updateUser = async (db, id, user) => await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: user });
const deleteUser = async (db, id) => await db.collection('users').deleteOne({ _id: new ObjectId(id) });

// Routes
router.get('/', checkRole(['admin', 'superadmin']), async (req, res) => {
  try {
    const users = await getUsers(req.db);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/:id', checkRole(['admin', 'superadmin']), async (req, res) => {
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

// Add User Route - Only admin and superadmin can add a user, but only superadmin can assign 'admin' or 'superadmin' roles
router.post('/', checkRole(['admin', 'superadmin']), async (req, res) => {
  try {
    const { username, email, password, role = 'user' } = req.body;

    // Ensure only superadmin can assign admin or superadmin roles
    if ((role === 'admin' || role === 'superadmin') && req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Only superadmin can assign admin or superadmin roles' });
    }

    const existingUser = await getUserByUsername(req.db, username);
    const existingEmail = await req.db.collection('users').findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hashedPassword, role };
    const result = await addUser(req.db, newUser);

    if (!result.insertedId) {
      return res.status(500).json({ error: 'Failed to add user' });
    }

    res.status(201).json({ message: 'User added successfully', userId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// Update User Route - Users should not be able to change their role without proper permissions
router.put('/:id', checkRole(['admin', 'superadmin']), async (req, res) => {
  try {
    const { role, ...userData } = req.body;

    // Check if role change is attempted and restrict it
    if (role && (role === 'admin' || role === 'superadmin') && req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Only superadmin can assign admin or superadmin roles' });
    }

    const result = await updateUser(req.db, req.params.id, { ...userData, ...(role ? { role } : {}) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete User Route - Only admin and superadmin can delete users
router.delete('/:id', checkRole(['admin', 'superadmin']), async (req, res) => {
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

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const existingUser = await getUserByUsername(req.db, username);
    const existingEmail = await req.db.collection('users').findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hashedPassword, role: 'user' };
    const result = await addUser(req.db, newUser);

    if (!result.insertedId) {
      return res.status(500).json({ error: 'Failed to register user' });
    }

    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: 'An unexpected error occurred during registration' });
  }
});

// User Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(req.db, username);

    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to login' });
  }
});

module.exports = router;
