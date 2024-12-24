const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

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
  

// Basic Route
app.get('/', (req, res) => {
  res.send('Welcome to the Ticket Management System');
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const eventRoutes = require('./routes/eventRoutes'); // Add eventRoutes
app.use('/api/events', eventRoutes); // Set up the event routes

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

// Start the server using `server.listen`
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// // Use the `server` instead of `app` to listen on the port
// server.listen(5000, () => {
//   console.log('Server running on port 5000');
// });


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
