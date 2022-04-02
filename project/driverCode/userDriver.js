const express = require('express');
const User = require('../models/user');


module.exports.registerPage = (req, res)=>{
    res.render('auth/register.ejs');
}

module.exports.registerUser = async(req, res, next) =>{
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
}

module.exports.loginPage = (req, res)=>{
    res.render('auth/login.ejs');
}

module.exports.loginUser = (req, res)=>{
    req.flash('success', "Logged in!");
    const redirectUrl = req.session.returnTo || '/posts';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Logged out!');
    res.redirect('/posts');
}