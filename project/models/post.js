const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
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
    },
    image: {
        type: String,
    },
    likes: {
        type: Number,
        min: 0
    },
    category: {
        type: String,
        enum: ['question', 'fluff', 'announcement', 'general'],
        required: true
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;