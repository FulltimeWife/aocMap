const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'No Username supplied']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password']
  },
  role: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 0
  }
},{timestamps: true})

module.exports = mongoose.model('userTable', userSchema)