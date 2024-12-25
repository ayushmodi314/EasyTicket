const express = require('express');
const router = express.Router(); // Create a new router instance

// POST route for guest login (no authentication required)
router.post('/guest-login', async (req, res) => {
  try {
    // No need for user validation in guest login
    res.status(200).json({ message: 'Guest login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; // Export the router
