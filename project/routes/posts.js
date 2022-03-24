const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const Post = require('../models/post');
const {postSchema} = require('../schemas.js')
const ExpressError = require('../helpers/ExpressError');

const validatePost = (req, res, next) =>{
    const {error} = postSchema.validate(req.body);
    if (error){
        const msg = error.details.map(i => i.message).join(',');
        throw new ExpressError(msg, 400);
    }
    // Need to call next or we will just get stuck here.
    next();
}

router.get('/', catchAsync(async (req, res) => {
    const posts = await Post.find({});
    
    res.render('posts/index.ejs', {posts});
}));

router.get('/new', (req, res) =>{
    res.render('posts/new.ejs');
});

router.post('/', validatePost, catchAsync(async (req, res) =>{
    const post = new Post(req.body.post);
    console.log(req.body.post);
    await post.save();
    req.flash('success', 'Made a new post');
    res.redirect(`/posts/${post._id}`);
}));

router.get('/:id', catchAsync(async (req, res) =>{
    const {id} = req.params;
    //console.log(id);
    const post = await Post.findById(id).populate('comments');
    if (!post){
        req.flash('error', "Post doesnt exist");
        return res.redirect('/posts');
    }
    res.render('posts/show', {post});
}));

router.get('/:id/edit', catchAsync(async (req, res) =>{
    const {id} = req.params;
    const post = await Post.findById(id);
    res.render('posts/edit', {post});
}));

router.put('/:id', validatePost, catchAsync(async(req, res) =>{
    console.log("EDDITEED");
    const post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
    if (!post){
        req.flash('error', "Post doesnt exist");
        return res.redirect('/posts');
    }
    req.flash('success', 'Updated your post');
    res.redirect(`/posts/${req.params.id}`);
}));

router.delete('/:id', catchAsync(async(req, res) =>{
    console.log("DELETEEETDDD")
    // res.send("DELETINGHEHEH")
    await Post.findByIdAndDelete(req.params.id);
    req.flash('success', 'Post deleted');
    res.redirect(`/posts`);
}));



module.exports = router