// Import Packages
const express = require('express');

// Create Express Router
const router = express.Router();

// Import Controllers
const PageController = require('../controllers/PageController');

// Import Middleware
const RedirectMiddleware = require('../middlewares/redirectMiddleware');

// Home Page
router.route('/').get(PageController.getHomePage);

// Furniture Page
router.route('/furnitures').get(PageController.getFurniturePage);

// Contact page
router.route('/contact').get(PageController.getContactPage)
                        .post(PageController.sendEmail);
// Blog Page
router.route('/blog').get(PageController.getBlogPage);

// About Page
router.route('/about').get(PageController.getAboutPage);

// Login Page 
router.route('/login').get(RedirectMiddleware,PageController.getLoginPage);

// Register Page
router.route('/register').get(RedirectMiddleware,PageController.getRegisterPage);

module.exports = router;