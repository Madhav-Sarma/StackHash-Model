const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// Controller functions
const getUsers = async (db) => {
    return await db.collection('users').find().toArray();
};

const getUserById = async (db, id) => {
    return await db.collection('users').findOne({ _id: new ObjectId(id) });
};

const addUser = async (db, user) => {
    return await db.collection('users').insertOne(user);
};

const updateUser = async (db, id, user) => {
    return await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: user });
};

const deleteUser = async (db, id) => {
    return await db.collection('users').deleteOne({ _id: new ObjectId(id) });
};

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

module.exports = router;
