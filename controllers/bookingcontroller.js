const SeatBooking = require('../models/SeatBooking');  // Import the model for storing booking data

// Handle seat selection logic
exports.selectSeats = async (req, res) => {
  const { movieId, seats } = req.body;  // Get movie and selected seats from the request

  try {
    // Save the seat selection (you can also validate, check availability, etc.)
    const booking = new SeatBooking({ movieId, seats });
    await booking.save();
    res.status(200).json({ message: 'Seats successfully booked!', booking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book seats, try again later.' });
  }
};
