const mongoose = require('mongoose');
const Comment = require('./comment')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
    },
    image: {
        type: String,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
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

// If we delete a post, delete all the comments as well.
// 'post' means we run this function after the action is done.
postSchema.post('findOneAndDelete', async function(doc){
    if (doc){
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})

module.exports = mongoose.model('Post', postSchema);