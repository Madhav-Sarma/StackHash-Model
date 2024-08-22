const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// Controller functions
const getShows = async (db) => {
    return await db.collection('shows').find().toArray();
};

const getShowById = async (db, id) => {
    return await db.collection('shows').findOne({ _id: new ObjectId(id) });
};

const addShow = async (db, show) => {
    return await db.collection('shows').insertOne(show);
};

const updateShow = async (db, id, show) => {
    return await db.collection('shows').updateOne({ _id: new ObjectId(id) }, { $set: show });
};

const deleteShow = async (db, id) => {
    return await db.collection('shows').deleteOne({ _id: new ObjectId(id) });
};

// Routes
router.get('/', async (req, res) => {
    try {
        const shows = await getShows(req.db);
        res.json(shows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch shows' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const show = await getShowById(req.db, req.params.id);
        if (show) {
            res.json(show);
        } else {
            res.status(404).json({ error: 'Show not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch show' });
    }
});

router.post('/', async (req, res) => {
    try {
        const show = req.body;
        const result = await addShow(req.db, show);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add show' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const show = req.body;
        const result = await updateShow(req.db, req.params.id, show);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update show' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteShow(req.db, req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete show' });
    }
});

module.exports = router;
