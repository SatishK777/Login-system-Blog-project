const mongoose = require('mongoose');

// Define schema for user
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the model for the users collection
const User = mongoose.model('User', userSchema);

module.exports = User;
