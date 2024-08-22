const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const verifyToken = require('./middleware/verifyToken');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection setup
const url = process.env.MONGODB_URI;
const dbName = 'movieBookingDB';
let db;

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName);
        console.log('Connected to MongoDB Atlas');

        // Middleware to pass the database to routes
        app.use((req, res, next) => {
            req.db = db;
            next();
        });

        // Import API routes
        const movieRoutes = require('./apis/movie-api');
        const showRoutes = require('./apis/show-api');
        const userRoutes = require('./apis/user-api');

        // Use API routes
        app.use('/api/movies', movieRoutes);
        app.use('/api/shows', showRoutes);
        app.use('/api/users', userRoutes);

        // Start the server
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(error => console.error('Failed to connect to MongoDB Atlas:', error));
