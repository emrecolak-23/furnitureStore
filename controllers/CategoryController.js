// Import Packages
const fs = require('fs');
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

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    await Category.findByIdAndRemove(req.params.id);

    let deletedImage = __dirname + '/../uploads/category/' +category.image;
    fs.unlinkSync(deletedImage);
    res.status(200).redirect('/user/dashboard');
  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    })
  }
}