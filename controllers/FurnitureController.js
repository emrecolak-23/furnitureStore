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
    let filter = {};
    const categorySlug = req.params.categorySlug
    const category = await Category.findOne({slug: categorySlug});
    if (categorySlug) {
      filter = {category: category._id}
    }
    const furnitures = await Furniture.find(filter);
    res.status(200).render('productByCategory', {
      page_name: 'furnitures',
      furnitures,
      category
    })
  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    })
  }
}

exports.getOneFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.findOne({slug:req.params.furnitureSlug}).populate('category')
    res.status(200).render('furniture-single', {
      page_name: 'furniture',
      furniture
    })
  } catch(error) {
    res.status(400).json({
      status: 'Something went wrong',
      error
    });
  }
}