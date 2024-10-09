const express = require('express');
const { signup, login } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Signup route
router.post('/signup', signup);

// Signin route
router.post('/login', login);


module.exports = router;
