// Import Packages
const express = require('express');

// Import Controller
const FurnitureController = require('../controllers/FurnitureController');

// Create router
const router = express.Router();

router.route('/').post(FurnitureController.createFurniture);

module.exports = router