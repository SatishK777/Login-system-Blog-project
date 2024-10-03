const express = require('express');
const passport = require('passport');
const {
    signupController,
    postSignupController,
    loginController,
    postLoginController,
    dashboardController,
    profileController
} = require('../controllers/userController');

const router = express.Router();

router.get('/signup', signupController);
router.post('/signup', postSignupController);

router.get('/login', loginController);
router.post('/login', postLoginController);

router.get('/dashboard', ensureAuthenticated, dashboardController);
router.get('/profile', ensureAuthenticated, profileController);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
