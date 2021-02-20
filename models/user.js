const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  uname: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  },
  authLevel: {
    type: Number,
    required: true
  }
});

// set timestamps
userSchema.set('timestamps', true);

module.exports = mongoose.model('User', userSchema);