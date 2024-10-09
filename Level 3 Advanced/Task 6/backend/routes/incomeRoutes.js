const express = require('express');
const { addIncome, getIncome, deleteIncome } = require('../controllers/incomeController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Add a new income (protected route)
router.post('/add', authenticate, addIncome);

// Get all income (protected route)
router.get('/', authenticate, getIncome);

// Delete an income by ID (protected route)
router.delete('/:id', authenticate, deleteIncome);

module.exports = router;
