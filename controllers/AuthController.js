// Import Package
const bcrypt = require('bcrypt');
// Import Models
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
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
          req.session.userID = user._id;
          res.status(200).redirect('/user/dashboard');
        }
      })
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
    const user = await User.findOne({_id: req.session.userID});
    res.status(200).render('dashboard', {
      page_name: 'dashboard',
      user
    })
  } catch(error) {
    res.status(400).redirect('/login');
  }
}