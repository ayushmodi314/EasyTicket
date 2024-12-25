const express = require('express');
const router = express.Router();

// Guest Login (bypasses authentication)
router.post('/guest-login', async (req, res) => {
  try {
    // Since it's a guest login, we don't need authentication
    res.status(200).json({ message: 'Guest login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
