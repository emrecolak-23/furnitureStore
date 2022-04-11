// Import Packages
const express = require('express');

// Import Controllers
const CategoryController = require('../controllers/CategoryController');

// Create express router
const router = express.Router();

router.route('/').post(CategoryController.createCategory);

module.exports = router