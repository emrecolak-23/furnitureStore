// Import Packages
const express = require('express');

// Import Controllers
const AuthController = require('../controllers/AuthController');

// Import Middlewares
const AuthMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');

// Import Validation
const schema = require('../validations/Auth');

// Create express router
const router = express.Router();

// Register Process
router.route('/register').post(validate(schema.registerValidation,'/register'),AuthController.register);
// Login Process
router.route('/login').post(validate(schema.loginValidation, '/login'),AuthController.login);
// Logout Process
router.route('/logout').get(AuthController.logout);
// Dashboard Page Process
router.route('/dashboard').get(AuthMiddleware,AuthController.getDashboardPage);

// Delete User
router.route('/:id').delete(AuthController.deleteUser);

module.exports = router