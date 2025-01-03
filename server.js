const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');  // Add path import
const bcrypt = require('bcryptjs');  // For password hashing

dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: false, // Set to false since credentials cannot be used with '*'
};

//We are allowing to access for everyone although we can change it to our vercel front end URL.

//We are now modifying the backend /  request to display a message to go to Frontend URL at line no 104

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const eventRoutes = require('./routes/eventRoutes'); // Add eventRoutes
app.use('/api/events', eventRoutes); // Set up the event routes

// Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Booking Routes
const movieBookingRoutes = require('./routes/bookingRoutes');
app.use('/api', movieBookingRoutes);


// Serve static files :-
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Seating')));




//Payment Folder
const Paymentroutes = require('./public/Payments/gateway');
app.use('/api',Paymentroutes);

// //serve payment static files
// app.use(express.static(path.join(__dirname, 'Payments')));



// Socket.io setup for real-time notifications
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app); // Wrap the Express app with HTTP server
//const io = new Server(server); // Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: false, // Ensure this is false when using '*'
  },
});



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

// //CHANGES FOR PRODUCTION VERCEL
// // Fallback for SPA routing
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html')); // Serve index.html for unknown routes
// });


//TO RESOLVE GET ERROR
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html')); // Adjust path if needed
// });
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API backend. Please use the official frontend at https://easy-ticket-mauve.vercel.app',
  });
});


app.get('/index', (req, res) => {
  res.redirect('/');// Adjust path if needed
});
app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.use(express.static(__dirname));


// Define the port
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
