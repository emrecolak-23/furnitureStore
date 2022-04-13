// Import Packages
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
  },
  role: {
    type: String,
    enum: ["seller", "customer", "admin"],
    default: "customer"
  },
  furnitures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Furniture'
  }]
})

UserSchema.pre('save', function(next){
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err,salt)=> {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) throw error;
      user.password = hash;
      next();
    })
  })
  
});

// Create User Model
const User = mongoose.model('User', UserSchema);

module.exports = User;