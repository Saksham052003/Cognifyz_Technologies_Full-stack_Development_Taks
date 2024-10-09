const express = require('express');
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expenseController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Add a new expense (protected route)
router.post('/add', authenticate, addExpense);

// Get all expenses (protected route)
router.get('/', authenticate, getExpenses);

// Delete an expense by ID (protected route)
router.delete('/:id', authenticate, deleteExpense);

module.exports = router;
