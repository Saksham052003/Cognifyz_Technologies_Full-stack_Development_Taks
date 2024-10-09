const Expense = require('../models/Expense');

// Add a new expense
exports.addExpense = async (req, res) => {
  const { description, amount, date } = req.body;

  // Make sure req.user has the correct property
  const userId = req.user._id; // Change req.user.id to req.user._id if that’s what it is

  try {
    const newExpense = new Expense({
      userId, // Now this should have a valid value
      description,
      amount,
      date,
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error adding expense:', error); // Log the error details
    res.status(500).json({ error: 'Server error' });
  }
};


// Get all expenses for the authenticated user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }); // Ensure you're using _id
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error); // Log the error details
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
  const userId = req.user._id; // Get the user ID from the authenticated user
  const { id } = req.params; // Get the expense ID from the request parameters

  try {
    // Find and delete the expense, ensuring it belongs to the authenticated user
    const expense = await Expense.findOneAndDelete({ _id: id, userId: userId });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or you do not have permission to delete this expense' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error); // Log the error details
    res.status(500).json({ error: 'Server error' });
  }
};
