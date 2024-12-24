const Event = require('../models/Event');

// Create a new event
const createEvent = async (req, res) => {
  const { name, date, location, ticketsAvailable } = req.body;

  try {
    const newEvent = new Event({
      name,
      date,
      location,
      ticketsAvailable,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createEvent, getEvents };
