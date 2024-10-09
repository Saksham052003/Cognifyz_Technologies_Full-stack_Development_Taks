// models/userModel.js
const fs = require('fs');
const bcrypt = require('bcrypt');
const validator = require('validator');
const userFilePath = './data.json';

const readData = () => {
    const data = fs.readFileSync(userFilePath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(userFilePath, JSON.stringify(data, null, 2));
};

// Signup function
const signup = async (email, password) => {
    // Validation
    if (!email || !password) throw new Error('All fields must be filled');
    if (!validator.isEmail(email)) throw new Error('Email is not valid');
    if (!validator.isStrongPassword(password)) throw new Error('Password is not strong enough');

    const data = readData();
    const userExists = data.users.some(user => user.email === email);
    if (userExists) throw new Error('Email already in use');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = { email, password: hash };

    data.users.push(newUser);
    writeData(data);

    return newUser;
};

// Login function
const login = async (email, password) => {
    const data = readData();
    const user = data.users.find(user => user.email === email);
    if (!user) throw new Error('Incorrect email');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Incorrect password');

    return user;
};

module.exports = { signup, login };
