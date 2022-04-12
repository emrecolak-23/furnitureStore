// Import model 
const User = require('../models/User');

module.exports = (req, res ,next) => {

  User.findById(req.session.userID, (err, user)=>{
    if (err || !user) res.status(400).redirect('/login');
    next(); 
  })

}