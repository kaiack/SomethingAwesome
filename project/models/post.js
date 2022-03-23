const mongoose = require('mongoose');
const Comment = require('./comment')
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

postSchema.post('findOneAndDelete', async function(doc){
    if (doc){
        await Comment.remove({
            _id: {
                $in: doc.comments
            }
        })
    }
})

module.exports = mongoose.model('Post', postSchema);