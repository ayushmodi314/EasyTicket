const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');  // Add path import
const bcrypt = require('bcryptjs');  // For password hashing

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const eventRoutes = require('./routes/eventRoutes'); // Add eventRoutes
app.use('/api/events', eventRoutes); // Set up the event routes

// Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io setup for real-time notifications
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app); // Wrap the Express app with HTTP server
const io = new Server(server); // Initialize Socket.IO server

// Listen for client connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send a welcome notification
  socket.emit('notification', 'Welcome to BookMyShow! Real-time notifications enabled.');

  // Example: Broadcasting a message
  setTimeout(() => {
    io.emit('notification', 'Don’t miss our special discounts this weekend!');
  }, 5001);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Define the port
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
