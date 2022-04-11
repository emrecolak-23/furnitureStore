// Import Packages
const express = require('express');

// Create Express Router
const router = express.Router();

// Import Controllers
const PageController = require('../controllers/PageController');

// Home Page
router.route('/').get(PageController.getHomePage);

// Furniture Page
router.route('/furnitures').get(PageController.getFurniturePage);

// Contact page
router.route('/contact').get(PageController.getContactPage);

// Blog Page
router.route('/blog').get(PageController.getBlogPage);

// About Page
router.route('/about').get(PageController.getAboutPage);

module.exports = router;