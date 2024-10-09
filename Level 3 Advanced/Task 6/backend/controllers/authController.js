const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Token generation function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

// Signup a new user
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Use createToken function to generate token
    const token = createToken(newUser._id);

    res.status(201).json({ email, token, message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);  // Log the error details
    res.status(500).json({ error: 'Server error' });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    // Use createToken function to generate token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    console.error('Error during login:', error);  // Log the error details
    res.status(500).json({ error: 'Server error' });
  }
};
