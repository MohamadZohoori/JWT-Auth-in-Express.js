const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    subscription: { type: String, enum: ['Not Subscribed', 'Basic', 'Plus'], default: 'Not Subscribed' },
    phoneNumber: { type: String, default: null },
    tokens: { type: Object, default: {} } // Assuming tokens will be stored as key-value pairs
});

module.exports = mongoose.model('User', userSchema);

