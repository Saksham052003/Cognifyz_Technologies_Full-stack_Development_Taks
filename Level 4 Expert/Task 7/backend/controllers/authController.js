const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

const signup = async (req, res) => {
    const { email, password} = req.body;
  try {
    const useremail= await User.findOne({ email });
    if (useremail) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password:hashedPassword});
    await newUser.save();
    
    const token = createToken(newUser._id);
    
    res.status(201).json({ email, token, message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup: ', error)
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
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

module.exports = { signup, login };
