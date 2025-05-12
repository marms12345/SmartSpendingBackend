const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Add jwt
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Adjust path if needed

router.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'No user with that email.' });

        const token = jwt.sign({ email: user.email }, 'iccx hfvw josz wtjr', { expiresIn: '1h' }); // JWT token

        const resetLink = `http://localhost:3000/reset-password/${token}`;//your frontend route

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'swamynaidu1743@gmail.com', // Replace with your actual Gmail
                pass: 'iccx hfvw josz wtjr', // Replace with your App Password from Google
            },
        });

        await transporter.sendMail({
            to: user.email,
            from: 'swamynaidu1743@gmail.com',
            subject: 'Password Reset',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
        });

        res.json({ msg: 'Password reset link sent to your email.', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error sending reset link.' });
    }
});

module.exports = router;