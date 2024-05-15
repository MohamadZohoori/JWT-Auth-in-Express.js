const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let tokenBlacklist = [];

const logoutUser = (req, res) => {
    // Extract token from request headers
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(' ')[1];

    // Add token to blacklist
    tokenBlacklist.push(token);
    
    res.json({ message: "Logout successful" });
};

const verifyToken = (req, res, next) => {
    // Extract token from request headers
    const token = req.headers.authorization.split(' ')[1];

    // Check if token is in the blacklist
    if (tokenBlacklist.includes(token)) {
        return res.status(401).json({ message: "Invalid token" });
    }

    // Verify token and continue to next middleware if valid
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded.user;
        next();
    });
};

module.exports = { logoutUser, verifyToken };
