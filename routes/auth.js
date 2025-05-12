const express = require('express');
//#################### use this when the react component is ready
// const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import your User model
const router = express.Router();

// Register route: POST /register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    //#################### use this when the react component is ready
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with the role and other details
    const newUser = new User({
      name,
      email,
      password,
      role  // Role field
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ msg: 'User registered successfully' ,newUser});
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during registration.' });
  }
});

module.exports = router;