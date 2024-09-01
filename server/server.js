// server.js

const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration to allow requests from specific origins
const corsOptions = {
    origin: 'http://localhost:3000', // Allow only this origin (your frontend URL)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

// Apply CORS middleware with the specified options
app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON bodies

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
        const theatreRoutes = require('./apis/theatre-api');
        const bookingApi = require('./apis/booking-api');

        // Use API routes
        app.use('/api/movies', movieRoutes);
        app.use('/api/shows', showRoutes);
        app.use('/api/users', userRoutes);
        app.use('/api/theatres', theatreRoutes);
        app.use('/api/booking', bookingApi);

        // Payment Link Generation Route
        app.post('/generate-payment-link', (req, res) => {
            const { selectedSeats } = req.body;

            // Server-side validation of selected seats can be added here

            const token = crypto.randomBytes(32).toString('hex');

            // Here, you can store the token in your database with an expiration time
            // Associate it with the user's session or selected seats

            const paymentLink = `https://razorpay.me/@mymovieticketbookingapp?amount=zgioswZa9n4qt5x9yD7i%2BQ%3D%3D&token=${token}`;
            res.json({ paymentLink });
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(error => console.error('Failed to connect to MongoDB Atlas:', error));
