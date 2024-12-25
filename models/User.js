const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
<<<<<<< HEAD
  //role: { type: String, enum: ['admin', 'organizer', 'attendee'], default: 'attendee' },
});
const User = mongoose.model('User', userSchema);
=======
  role: { type: String, enum: ['admin', 'organizer', 'attendee'], default: 'attendee' },
});
>>>>>>> 7fb15a7c9dacca42187fb966a0f99cc6c39bda4c

module.exports = mongoose.model('User', userSchema);
