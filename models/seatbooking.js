// models/SeatBooking.js
const mongoose = require('mongoose');

const seatBookingSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  seats: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SeatBooking', seatBookingSchema);
