// Import Packages
const express = require('express');

// Import Controllers
const AuthController = require('../controllers/AuthController');

// Import Middlewares
const AuthMiddleware = require('../middlewares/authMiddleware');

// Create express router
const router = express.Router();

// Register Process
router.route('/register').post(AuthController.register);
// Login Process
router.route('/login').post(AuthController.login);
// Logout Process
router.route('/logout').get(AuthController.logout);
// Dashboard Page Process
router.route('/dashboard').get(AuthMiddleware,AuthController.getDashboardPage);

module.exports = router