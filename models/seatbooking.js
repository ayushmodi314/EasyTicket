// models/SeatBooking.js
const mongoose = require('mongoose');

const seatBookingSchema = new mongoose.Schema({
  movie: { type: String, required: true },
  seats: { type: [String], required: true },
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('seatBooking', seatBookingSchema);
