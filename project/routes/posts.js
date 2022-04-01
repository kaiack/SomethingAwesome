const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const Post = require('../models/post');
const {isLoggedIn, validatePost, checkPostAuthor} = require('../myMiddleware');
const { response } = require('express');



router.get('/', catchAsync(async (req, res) => {
    const posts = await Post.find({});
    
    res.render('posts/index.ejs', {posts});
}));

router.get('/new', isLoggedIn, (req, res) =>{
    res.render('posts/new.ejs');
});

router.post('/', isLoggedIn, validatePost, catchAsync(async (req, res) =>{
    const post = new Post(req.body.post);
    //console.log(req.body.post);
    post.author = req.user._id;
    await post.save();
    req.flash('success', 'Made a new post');
    res.redirect(`/posts/${post._id}`);
}));

router.get('/:id', catchAsync(async (req, res) =>{
    const {id} = req.params;
    //console.log(id);
    const post = await (await Post.findById(id).populate({path: 'comments', populate: {path: 'author'}}).populate('author'));

    if (!post){
        req.flash('error', "Post doesnt exist");
        return res.redirect('/posts');
    }
    res.render('posts/show', {post});
}));

router.get('/:id/edit', isLoggedIn, checkPostAuthor, catchAsync(async (req, res) =>{
    const {id} = req.params;
    const post = await Post.findById(id);
    if (!post){
        req.flash('error', 'cannot find that post');
        return res.redirect('/posts');
    }
    res.render('posts/edit', {post});
}));

router.put('/:id', isLoggedIn, checkPostAuthor, validatePost, catchAsync(async(req, res) =>{
    console.log("EDDITEED");
    
    if (!post.author.equals(req.user._id)) {
        req.flash("error", "You are not authorised to do this.")
        res.redirect(`/posts/${req.params.id}`);
    }
    await Post.findByIdAndUpdate(req.params.id, req.body.post);
    req.flash('success', 'Updated your post');
    res.redirect(`/posts/${req.params.id}`);
}));

router.delete('/:id', isLoggedIn, checkPostAuthor, catchAsync(async(req, res) =>{
    console.log("DELETEEETDDD")
    // res.send("DELETINGHEHEH")
    await Post.findByIdAndDelete(req.params.id);
    req.flash('success', 'Post deleted');
    res.redirect(`/posts`);
}));



module.exports = router