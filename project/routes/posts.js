const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const Post = require('../models/post');
const Comment = require('../models/comment');
const {postSchema, commentSchema} = require('../schemas.js')
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
const validateComment = (req, res, next) =>{
    const {error} = commentSchema.validate(req.body);
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
    res.redirect(`/${post._id}`);
}));

router.get('/:id', catchAsync(async (req, res) =>{
    const {id} = req.params;
    //console.log(id);
    const post = await Post.findById(id).populate('comments');
    res.render('posts/show', {post});
}));

router.get('/:id/edit', catchAsync(async (req, res) =>{
    const {id} = req.params;
    const post = await Post.findById(id);
    res.render('posts/edit', {post});
}));

router.put('/:id', validatePost, catchAsync(async(req, res) =>{
    // console.log("EDDITEED")
    const post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
    res.redirect(`/${req.params.id}`);
}));

router.delete('/:id', catchAsync(async(req, res) =>{
    console.log("DELETEEETDDD")
    // res.send("DELETINGHEHEH")
    await Post.findByIdAndDelete(req.params.id);
    res.redirect(``);
}));

router.post('/:id/comments', validateComment, catchAsync(async(req, res)=>{
    console.log("HERE")
    const post = await Post.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    post.comments.push(comment);
    await comment.save();
    await post.save();
    res.redirect(`/${post._id}`);
}));

router.delete('/:id/comments/:commentId', catchAsync(async(req, res)=>{
    const {id, commentId} = req.params;
    await Post.findByIdAndUpdate(id, {$pull: {comments: commentId}});
    await Comment.findOneAndDelete(commentId);
    res.redirect(`/${id}`);
}));

module.exports = router