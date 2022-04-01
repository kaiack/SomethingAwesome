const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../helpers/catchAsync');
const Post = require('../models/post');
const Comment = require('../models/comment');
const {commentSchema} = require('../schemas.js')
const ExpressError = require('../helpers/ExpressError');
const {validateComment, isLoggedIn, checkCommentAuthor} = require('../myMiddleware');


router.post('/', isLoggedIn, validateComment, catchAsync(async(req, res)=>{
    console.log("HERE")
    const post = await Post.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    post.comments.push(comment);
    await comment.save();
    await post.save();
    req.flash('success', 'Comment added');
    res.redirect(`/posts/${post._id}`);
}));

router.delete('/:commentId',isLoggedIn, checkCommentAuthor, catchAsync(async(req, res)=>{
    const {id, commentId} = req.params;
    await Post.findByIdAndUpdate(id, {$pull: {comments: commentId}});
    await Comment.findOneAndDelete(commentId);
    req.flash('success', 'Comment deleted');
    res.redirect(`/posts/${id}`);
}));

module.exports = router;