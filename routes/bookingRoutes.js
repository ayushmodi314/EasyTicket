const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking= require('../models/seatbooking'); // Adjust the path to the Booking model

// Create a model
//const Booking = mongoose.model('Booking', bookingSchema);

// POST route to book seats
router.post('/book-seats', async (req, res) => {
  const { movie, seats } = req.body;

  if (!movie || !seats || seats.length === 0) {
    return res.status(400).json({ error: 'Invalid booking details' });
  }

  const totalPrice = seats.length * 300; // Calculate total price
  try {
    const newBooking = new Booking({ movie, seats, totalPrice });
    await newBooking.save();

    res.status(200).json({ success: true, seats, totalPrice });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
