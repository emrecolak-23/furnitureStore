// Import Model
const Furniture = require('../models/Furnitures');

exports.createFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.create(req.body);
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