const express = require('express');
const router = express.Router();
const { createEvent, getEvents } = require('../controllers/eventController');

// POST /events: Create event
router.post('/', createEvent);

// GET /events: Get all events
router.get('/', getEvents);

module.exports = router;
