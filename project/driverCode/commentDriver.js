const express = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createComment = async(req, res)=>{
    console.log("HERE")
    const post = await Post.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    post.comments.push(comment);
    await comment.save();
    await post.save();
    req.flash('success', 'Comment added');
    res.redirect(`/posts/${post._id}`);
}

module.exports.deleteComment = async(req, res)=>{
    const {id, commentId} = req.params;
    await Post.findByIdAndUpdate(id, {$pull: {comments: commentId}});
    await Comment.findOneAndDelete(commentId);
    req.flash('success', 'Comment deleted');
    res.redirect(`/posts/${id}`);
}