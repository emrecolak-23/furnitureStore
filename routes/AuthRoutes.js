// Import Packages
const express = require('express');

// Import Controllers
const AuthController = require('../controllers/AuthController');

// Create express router
const router = express.Router();

router.route('/register').post(AuthController.register);

router.route('/login').post(AuthController.login);

router.route('/logout').get(AuthController.logout);

module.exports = router