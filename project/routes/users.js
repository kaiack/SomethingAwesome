const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../helpers/catchAsync');
const passport = require('passport');
const Post = require('../models/post');
const {postSchema} = require('../schemas.js')
const ExpressError = require('../helpers/ExpressError');

router.get('/register', (req, res)=>{
    res.render('auth/register.ejs');
})

router.post('/register', catchAsync(async(req, res, next) =>{
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.login(registeredUser, err =>{
            if (err){
                return next(err);
            }
        });
        req.flash('success', 'Welcome');
        res.redirect('/posts');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/register');
    }
}));


router.get('/login', (req, res)=>{
    res.render('auth/login.ejs');
})


router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res)=>{
    req.flash('success', "Logged in!");
    const redirectUrl = req.session.returnTo || '/posts';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged out!');
    res.redirect('/posts');
})

module.exports = router;