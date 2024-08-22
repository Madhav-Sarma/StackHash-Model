const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// Controller functions
const getMovies = async (db) => {
    return await db.collection('movies').find().toArray();
};

const getMovieById = async (db, id) => {
    return await db.collection('movies').findOne({ _id: new ObjectId(id) });
};

const addMovie = async (db, movie) => {
    return await db.collection('movies').insertOne(movie);
};

const updateMovie = async (db, id, movie) => {
    return await db.collection('movies').updateOne({ _id: new ObjectId(id) }, { $set: movie });
};

const deleteMovie = async (db, id) => {
    return await db.collection('movies').deleteOne({ _id: new ObjectId(id) });
};

// Routes
router.get('/', async (req, res) => {
    try {
        const movies = await getMovies(req.db);
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await getMovieById(req.db, req.params.id);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
});

router.post('/', async (req, res) => {
    try {
        const movie = req.body;
        const result = await addMovie(req.db, movie);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add movie' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const movie = req.body;
        const result = await updateMovie(req.db, req.params.id, movie);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update movie' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteMovie(req.db, req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete movie' });
    }
});

module.exports = router;
