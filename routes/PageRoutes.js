// Import Packages
const express = require('express');

// Create Express Router
const router = express.Router();

// Import Controllers
const PageController = require('../controllers/PageController');

router.route('/').get(PageController.getHomePage);

module.exports = router;