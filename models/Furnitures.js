// Import Packages
const mongoose = require('mongoose');

// Create Schema Object
const Schema = mongoose.Schema;

// Create Furniture Schema
const FurnitureSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Furniture Model
const Furniture = mongoose.model('Furniture', FurnitureSchema);

module.exports = Furniture;