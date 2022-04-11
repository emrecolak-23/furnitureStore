// Import Packages
const express = require('express');

// Import Controller
const FurnitureController = require('../controllers/FurnitureController');

// Create router
const router = express.Router();

// Create Furniture
router.route('/').post(FurnitureController.createFurniture);

// Get All Furnitures
router.route('/').get(FurnitureController.getAllFurniture);

module.exports = router