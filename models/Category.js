// Import Packages
const mongoose = require('mongoose');

// Create Schema
const Schema = mongoose.Schema;

// Create CategorySchema
const CategorySchema = new Schema({
  name: {
    type:String,
    required: true,
    unique: true
  },
  image: {
    type: String
  }
})

// Create Category Model
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;