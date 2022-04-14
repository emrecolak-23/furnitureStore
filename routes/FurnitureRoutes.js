// Import Packages
const express = require('express');
const multer = require('multer');


// Import Controller
const FurnitureController = require('../controllers/FurnitureController');

// Multer Middleware
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/../uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});
let upload = multer({
  storage: storage,
}).single('image');

// Create router
const router = express.Router();

// Create Furniture
router.route('/').post(upload, FurnitureController.createFurniture);

// Get All Furnitures
router.route('/').get(FurnitureController.getAllFurniture);

// Get Furniture by category
router.route('/:categorySlug').get(FurnitureController.getFurnitureByCategory);

// Get One Furniture
router.route('/single/:furnitureSlug').get(FurnitureController.getOneFurniture);

// Delete & Update Furniture
router
  .route('/:id')
  .delete(FurnitureController.deleteFurniture)
  .put(FurnitureController.updateFurniture);
// Reserve Furniture For Customer User Roler
router.route('/reserve').post(FurnitureController.reserveFurniture);

// Release Furniture For Customer User Roler
router.route('/release').post(FurnitureController.releaseFurniture);
module.exports = router;
