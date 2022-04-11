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
      status: 'Furniture not created',
      error
    });
  }
}