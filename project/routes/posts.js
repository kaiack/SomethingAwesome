const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const {isLoggedIn, validatePost, checkPostAuthor} = require('../myMiddleware');
const posts = require('../driverCode/postDriver');


router.route('/')
    .get(catchAsync(posts.index))
    .post(isLoggedIn, validatePost, catchAsync(posts.createPost));

router.get('/new', isLoggedIn, posts.newForm);

router.route('/:id')
    .get(catchAsync(posts.getPost))
    .put(isLoggedIn, checkPostAuthor, validatePost, catchAsync(posts.editPost))
    .delete(isLoggedIn, checkPostAuthor, catchAsync(posts.deletePost));

router.get('/:id/edit', isLoggedIn, checkPostAuthor, catchAsync(posts.editPage));

router.post('/:id/like', isLoggedIn, catchAsync(posts.likePost));

module.exports = router