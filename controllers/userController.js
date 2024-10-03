const modelsmsg = require('../models/userModel');
const bcrypt = require('bcrypt');
const passport = require('passport');
const saltRounds = 10;

// Registration page
const signupController = (req, res) => {
    res.render('signup');
}

// Handle registration form
const postSignupController = async (req, res) => {
    if (req.body.password === req.body.confirmPassword) {
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const userData = {
            fname: req.body.fname,
            email: req.body.email,
            password: hash
        }
        const newUser = new modelsmsg(userData);
        await newUser.save();

        res.redirect('/login');
    } else {
        res.send('Passwords do not match');
    }
}

// Login page
const loginController = (req, res) => {
    res.render('login');
}

// Handle login with Passport.js
const postLoginController = passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
});

// Dashboard page after login
const dashboardController = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.render('dashboard', { user: req.user });
}

// Profile page
const profileController = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.render('profile', { user: req.user });
}

module.exports = {
    signupController,
    postSignupController,
    loginController,
    postLoginController,
    dashboardController,
    profileController
};
