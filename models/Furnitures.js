// Import Packages
const mongoose = require('mongoose');
const slugify = require('slugify');
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
  image: {
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  slug: {
    type: String,
    unique: true
  },
  price: {
    type: Number,
    get: v => (v/100).toFixed(2),
    set: v => v*100
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

FurnitureSchema.pre('validate', function(next){
  this.slug = slugify(this.name, {
    lower: true,
    strict: true
  })
  next();
});

// Create Furniture Model
const Furniture = mongoose.model('Furniture', FurnitureSchema);

module.exports = Furniture;