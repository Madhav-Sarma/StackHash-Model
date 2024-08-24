const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// Controller functions
const getMovies = async (db) => {
    return await db.collection('movies').find().toArray();
};

// Function to get a movie by its name
const getMovieByName = async (db, name) => {
    return await db.collection('movies').findOne({ name: name });
};

const addMovie = async (db, movie) => {
    return await db.collection('movies').insertOne(movie);
};

const updateMovie = async (db, name, movie) => {
    return await db.collection('movies').updateOne({ name: name }, { $set: movie });
};

const deleteMovie = async (db, name) => {
    return await db.collection('movies').deleteOne({ name: name });
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

router.get('/:name', async (req, res) => {
    try {
        const movie = await getMovieByName(req.db, req.params.name);
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

router.put('/:name', async (req, res) => {
    try {
        const movie = req.body;
        const result = await updateMovie(req.db, req.params.name, movie);
        if (result.modifiedCount === 1) {
            res.json({ message: 'Movie updated successfully' });
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update movie' });
    }
});

router.delete('/:name', async (req, res) => {
    try {
        const result = await deleteMovie(req.db, req.params.name);
        if (result.deletedCount === 1) {
            res.json({ message: 'Movie deleted successfully' });
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete movie' });
    }
});

module.exports = router;
