const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Hey you have to enter an email"],
        unique: [true, "You already have an account with that email address"]
    }, password: {
        type: String,
        required: [true, "You have to enter a password, why do I even have to tell you that?"]
    }, username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: [true, "That username already exists"]
    }
}, {timestamps: true});

const User = mongoose.model('user', userSchema);

module.exports = User;