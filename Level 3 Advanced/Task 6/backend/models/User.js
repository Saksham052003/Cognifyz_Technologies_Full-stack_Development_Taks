const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Static method for user signup
userSchema.statics.signup = async function (email, password) {
  // Validate email and password
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await this.create({ email, password: hashedPassword });

  return user;
};

// Static method for user login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Incorrect password');
  }

  return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
