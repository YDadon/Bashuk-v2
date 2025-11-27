// server/src/models/User.js
// Mongoose model for User
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { // Username field
        type: String,
        required: true,
        unique: true,
    },
    email: { // Email field
        type: String,
        required: true,
        unique: true,
    },
    password: { // Password field
        type: String,
        required: true,
    },
    goldCoins: { // Gold coins field
        type: Number,
        default: 0,
    },
    role: {  // Role field
        type: String,
        enum: ['user', 'admin'],  // Possible roles that a user can have
        default: 'user', // Default role
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);