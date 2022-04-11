// Import Model
const Furniture = require('../models/Furnitures');
const Category = require('../models/Category');

exports.createFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.create({
      name: req.body.name,
      description: req.body.description,
      image: req.file.filename,
      category: req.body.category
    });
    res.status(201).json({
      status: 'Furniture created',
      furniture
    });
  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    });
  }
}

exports.getAllFurniture = async (req, res) => {
  try {
    const furnitures = await Furniture.find().sort('-createdAt');
    res.status(200).json({
      status: 'Get all furnitures',
      furnitures
    })
  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    });
  }
}

exports.getFurnitureByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({slug: req.params.categorySlug});
    const furnitures = await Furniture.find({category:category._id});
    res.status(200).json({
      status: 'Furnitures listed by category',
      furnitures
    })
  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    })
  }
}