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
          ref: 'User'
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: [],
    likesNum: {
        type: Number
    },
    comments: [],
    commentsNum: {
        type: Number
    }
})

module.exports = mongoose.model("Post", PostSchema);
