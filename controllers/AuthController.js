// Import Package
const bcrypt = require('bcrypt');
// Import Models
const User = require('../models/User');
const Category = require('../models/Category');
const Furniture = require('../models/Furnitures');

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    await req.flash('success', `${user.name} has been registered successfully`);
    res.status(201).redirect('/login');
  } catch (error) {
    req.flash('error', 'Please try again!');
    res.status(400).redirect('/register');
  }
};

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
      bcrypt.compare(password, user.password, (err, same)=>{
        if (err) throw err
        if (same) {
          req.flash('success', `Hey ${user.name}, you are logged in`)
          req.session.userID = user._id;
          res.status(200).redirect('/user/dashboard');
        } else {
          req.flash('error', "Please enter valid password for your account");
          res.status(400).redirect('/login')
        }
      })
    } else {
      req.flash('error', 'Registered user not found');
      res.status(400).redirect('/login');
    }
  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    })
  }
}

exports.logout = (req, res) => {
  try {
    req.session.destroy(()=>{
      res.redirect('/')
    })
  } catch(error) {
    res.status(400).json({
      status: 'Your session not ended',
      error
    })
  }
}

exports.getDashboardPage = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.session.userID}).populate('furnitures')
    const categories = await Category.find();
    const furnitures = await Furniture.find({user: req.session.userID});
    
    // Dashboard for admin 
    const users = await User.find();
    res.render('dashboard', {
      page_name: 'dashboard',
      user,
      categories,
      furnitures,
      users
    })
  } catch(error) {
    res.status(400).redirect('/login');
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    await Furniture.deleteMany({user: req.params.id});
    req.flash('success', `${user.name} has been deleted successfully`);
    res.status(200).redirect('/user/dashboard');
  } catch(error) {
    req.flash('error', 'Something went wrong');
    res.status(400).redirect('/user/dashboard');
  }
}