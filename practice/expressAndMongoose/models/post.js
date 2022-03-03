const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        min: 0
    },
    category: {
        type: String,
        enum: ['Question', 'Fluff', 'Announcement', 'General']
    }
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;