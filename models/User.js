// Import Packages
const mongoose = require('mongoose');

// Create Schema
const Schema = mongoose.Schema;

// Create UserSchema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// Create User Model
const User = mongoose.model('User', UserSchema);

module.exports = User;