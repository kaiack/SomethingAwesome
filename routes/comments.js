const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../helpers/catchAsync');
const {validateComment, isLoggedIn, checkCommentAuthor} = require('../myMiddleware');
const comments = require('../driverCode/commentDriver');

router.post('/', isLoggedIn, validateComment, catchAsync(comments.createComment));

router.delete('/:commentId',isLoggedIn, checkCommentAuthor, catchAsync(comments.deleteComment));

module.exports = router;