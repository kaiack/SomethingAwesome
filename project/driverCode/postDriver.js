const express = require('express');
const Post = require('../models/post');

module.exports.index = async (req, res) => {
    const posts = await Post.find({});
    
    res.render('posts/index.ejs', {posts});
}

module.exports.newForm = (req, res) =>{
    res.render('posts/new.ejs');
}

module.exports.createPost = async (req, res) =>{
    const post = new Post(req.body.post);
    //console.log(req.body.post);
    post.author = req.user._id;
    post.likes = [];
    await post.save();
    req.flash('success', 'Made a new post');
    res.redirect(`/posts/${post._id}`);
}

module.exports.getPost = async (req, res) =>{
    const {id} = req.params;
    const post = await Post.findById(id).populate({path: 'comments', populate: {path: 'author'}}).populate('author');

    if (!post){
        req.flash('error', "Post doesnt exist");
        return res.redirect('/posts');
    }
    res.render('posts/show', {post});
}

module.exports.editPage = async (req, res) =>{
    const {id} = req.params;
    const post = await Post.findById(id);
    if (!post){
        req.flash('error', 'cannot find that post');
        return res.redirect('/posts');
    }
    res.render('posts/edit', {post});
}

module.exports.editPost = async(req, res) =>{
    console.log("EDDITEED");
    
    if (!post.author.equals(req.user._id)) {
        req.flash("error", "You are not authorised to do this.")
        res.redirect(`/posts/${req.params.id}`);
    }
    await Post.findByIdAndUpdate(req.params.id, req.body.post);
    req.flash('success', 'Updated your post');
    res.redirect(`/posts/${req.params.id}`);
}

module.exports.deletePost = async(req, res) =>{
    console.log("DELETEEETDDD")
    // res.send("DELETINGHEHEH")
    await Post.findByIdAndDelete(req.params.id);
    req.flash('success', 'Post deleted');
    res.redirect(`/posts`);
}

module.exports.likePost = async(req, res) =>{
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user._id)){
        post.likes.push(req.user._id);
    } else {
        const removeIndex = post.likes.indexOf(req.user._id);
        post.likes.splice(removeIndex, 1);
    }
    await post.save();
    //console.log(post);
    res.redirect(`/posts/${req.params.id}`);
}