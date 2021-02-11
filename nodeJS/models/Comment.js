// postID
// content
// date
// userID
// replyToID
//    Denoting which post that this replied to,
//    if it is the first comment, this is null
// Likes
//likesNum

const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    replyToID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    likes: [],
    likesNum: {
        type: Number
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
