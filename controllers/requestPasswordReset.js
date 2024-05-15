const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token and expiry date
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

        // Update user's reset token and expiry date
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'apikey', // This should always be 'apikey'
                pass: process.env.SENDGRID_API_KEY // Your SendGrid API key
            }
        });

        // Send password reset email
        await transporter.sendMail({
            from: process.env.EMAIL_USER, // Sender's email address
            to: user.email, // Recipient's email address
            subject: 'Password Reset',
            text: `You are receiving this email because a password reset request was received. Please click on the following link to reset your password: ${req.headers.host}/reset-password/${resetToken}`
        });

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { requestPasswordReset };
