const Income = require('../models/Income');

// Add a new income
exports.addIncome = async (req, res) => {
  const { source, amount, date } = req.body;

  console.log('Authenticated user:', req.user); // Log the user object

  try {
    const newIncome = new Income({
      userId: req.user._id, // Make sure to use _id
      source,
      amount,
      date,
    });

    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    console.error('Error adding income:', error.message); // Log error details
    res.status(500).json({ error: 'Server error' });
  }
};


// Get all income for the authenticated user
exports.getIncome = async (req, res) => {
  console.log('Fetching income for userId:', req.user._id); // Log the user ID

  try {
    const income = await Income.find({ userId: req.user._id });
    res.status(200).json(income);
  } catch (error) {
    console.error('Error fetching income:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete an income by ID
exports.deleteIncome = async (req, res) => {
  try {
    // Log the incoming request
    console.log(`Deleting income with ID: ${req.params.id}`);

    // Attempt to find and delete the income by ID
    const income = await Income.findByIdAndDelete(req.params.id);
    
    // If income is not found, send a 404 response
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    // Respond with a success message if deletion is successful
    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (error) {
    // Log the error details for debugging
    console.error('Error deleting income:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
