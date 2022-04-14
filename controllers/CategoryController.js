// Import Packages
const fs = require('fs');
// Import Model 
const Category = require('../models/Category');
 
// Import Logger
const Logger = require('../logger/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      image: req.file.filename
    });
    await req.flash('success', `${category.name} has been added successfully`);
    res.status(201).redirect('/user/dashboard');
  } catch(error) {
    Logger.log({
      level: 'error',
      message: error
    });
    req.flash('error', 'Something went wrong');
    res.status(400).redirect('/user/dashboard');
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    await Category.findByIdAndRemove(req.params.id);

    let deletedImage = __dirname + '/../uploads/category/' +category.image;
    fs.unlinkSync(deletedImage);
    await req.flash('success', `${category.name} has been deleted successfully`)
    res.status(200).redirect('/user/dashboard');
  } catch(error) {
    Logger.log({
      level: 'error',
      message: error
    });
    req.flash('error', 'Something went wrong!');
    res.status(400).redirect('/user/dashboard');
  }
}