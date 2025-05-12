const express = require('express');
const User = require('../models/User');
const router = express.Router();

// LOGIN (NO bcrypt, NO token — basic version)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    // Plain-text password match
    if (user.password !== password) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    // Optionally return user info or a dummy token for now
    res.status(200).json({
      success: true,
      msg: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error during login.' });
  }
});

module.exports = router;
