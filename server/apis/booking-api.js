const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Seat = require('../models/Seat');

// Sample in-memory database
const bookings = [];
const seats = []; // This should ideally be populated from a database

// Endpoint to book a seat
router.post('/book', (req, res) => {
    const { userId, showId, seatNumbers } = req.body;

    // Check if seats are available
    const availableSeats = seatNumbers.every(seatNumber => {
        const seat = seats.find(s => s.showId === showId && s.seatNumber === seatNumber);
        return seat && !seat.isReserved;
    });

    if (!availableSeats) {
        return res.status(400).json({ message: 'One or more seats are already reserved.' });
    }

    // Reserve seats
    seatNumbers.forEach(seatNumber => {
        const seat = seats.find(s => s.showId === showId && s.seatNumber === seatNumber);
        seat.isReserved = true;
    });

    // Create booking
    const booking = new Booking(Date.now(), userId, showId, seatNumbers);
    bookings.push(booking);

    return res.status(200).json({ message: 'Booking successful!', booking });
});

module.exports = router;
