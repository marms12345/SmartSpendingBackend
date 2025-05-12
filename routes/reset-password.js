const express = require('express');
const router = express.Router();
// ##########we can use this later for hashing the password
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /reset-password/:token
router.post('/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, 'iccx hfvw josz wtjr'); 

        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(400).json({ msg: 'User not found' });

        // ##########we can use this later for hashing the password
        // const hashedPassword = await bcrypt.hash(newPassword, 10);
        // After password reset
        user.password = newPassword;
        delete user.resetToken;
        delete user.resetTokenExpiry;

        await user.save();
        res.json({ msg: 'Password has been reset successfully',newPassword});
    } catch (err) {
        res.status(400).json({ msg: 'Invalid or expired token' });
    }
});

module.exports = router;