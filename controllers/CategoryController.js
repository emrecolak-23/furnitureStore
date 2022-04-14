// Import Model 
const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      image: req.file.filename
    });
    res.status(201).redirect('/user/dashboard');
  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    });
  }
}