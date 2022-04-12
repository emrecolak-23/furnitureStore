// Import Packages
const fs = require('fs');
// Import Model
const Furniture = require('../models/Furnitures');
const Category = require('../models/Category');

exports.createFurniture = async (req, res) => {
  const furniture = req.body;
  const imageName = req.file.filename;
  furniture.image = imageName;
  furniture.user = req.session.userID;
  try {
    await Furniture.create(furniture);
    res.status(201).redirect('/user/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
  }
};

exports.getAllFurniture = async (req, res) => {
  try {
    const furnitures = await Furniture.find().sort('-createdAt');
    res.status(200).json({
      status: 'Get all furnitures',
      furnitures,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
  }
};

exports.getFurnitureByCategory = async (req, res) => {
  try {
    let filter = {};
    const categorySlug = req.params.categorySlug;
    const category = await Category.findOne({ slug: categorySlug });
    if (categorySlug) {
      filter = { category: category._id };
    }
    const furnitures = await Furniture.find(filter);
    res.status(200).render('productByCategory', {
      page_name: 'furnitures',
      furnitures,
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
  }
};

exports.getOneFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.findOne({
      slug: req.params.furnitureSlug,
    })
      .populate('category')
      .populate('user');
    res.status(200).render('furniture-single', {
      page_name: 'furniture',
      furniture,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
  }
};

exports.deleteFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.findById(req.params.id);

    await Furniture.findByIdAndRemove(req.params.id);

    let imageFile = __dirname + '/../uploads/' + furniture.image;

    fs.unlinkSync(imageFile);

    res.status(200).redirect('/user/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      error,
    });
  }
};
