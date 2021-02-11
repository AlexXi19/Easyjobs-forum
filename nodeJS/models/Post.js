// title
// content
// date
// userID
// comment
// Likes

const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: [],
    likesNum: {
        type: Number,
        default: 0
    },
    comments: [],
    commentsNum: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Post", PostSchema);
