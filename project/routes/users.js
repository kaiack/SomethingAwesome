const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const passport = require('passport');
const users = require('../driverCode/userDriver');

router.route('/register')
    .get(users.registerPage)
    .post(catchAsync(users.registerUser));

router.route('/login')
    .get(users.loginPage)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.loginUser);

router.get('/logout', users.logout);

module.exports = router;