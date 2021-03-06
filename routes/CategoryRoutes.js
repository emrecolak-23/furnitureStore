// Import Packages
const express = require('express');
const multer = require('multer');
// Import Controllers
const CategoryController = require('../controllers/CategoryController');

// Create express router
const router = express.Router();

// Multer Middlewares
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/../uploads/category');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});
let upload = multer({
  storage: storage,
}).single('image');

router.route('/').post(upload, CategoryController.createCategory);

router.route('/:id').delete(CategoryController.deleteCategory);

module.exports = router