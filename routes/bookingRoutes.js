const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');  // Import the controller

// POST request to save seat selection (add more routes as needed)
router.post('/selectSeats', bookingController.selectSeats);

module.exports = router;
