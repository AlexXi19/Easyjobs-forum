const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const PostController = require('./PostController');
var mongo = require("mongodb");

// addComment
function addComment(req, res) {
  console.log("addComment function called");
  // Adds comment to comment collection
  User.find({ email: ssn.email }, function (err, docs) {
    // Obtaining values from front end
    var currentUserID = docs[0]._id;
    var currentContent = req.body.commentContent;
    var currentReplyToID = req.body.replyToID
      ? new mongo.ObjectID(req.body.replyToID)
      : null;
    var currentPostID = new mongo.ObjectID(req.body.replyPostID);

    // Creating comment object
    const newComment = new Comment({
      content: currentContent,
      userID: currentUserID,
      postID: currentPostID,
      replyToID: currentReplyToID,
    });

    // Save Comment into comments collection
    newComment.save();
    console.log("Comment saved");

    // Insert into Post collection
    Post.find({ _id: currentPostID }, function (err, docs1) {
      // Adding comment object to post object
      docs1[0].comments.push(newComment);
      docs1[0].save();
      // Incrementing comment number by 1
      Post.updateOne(
        { _id: currentPostID },
        { $inc: { commentsNum: 1 } },
        function (err, result) {
          if (err) throw err;
          console.log("Comment added successfully");
        }
      );
    });
  });
}

// getAllComments
function getAllComments(req, res) {
  console.log("getAllComments function called");
  Comment.find({}, function (err, docs) {
    var commentArray = docs;
    console.log("Sending Comments");
    console.log(docs);
    res.json(commentArray);
  });
}

// getCommentForPost
function getCommentForPost(req, res) {
    // Currently only works for the first layer
    console.log("getCommentForPost function called");
    var postID = new mongo.ObjectID(req.params.postID);
    console.log("Finding All Comments with Post" + postID);
    Comments.find({ postID: postID }, function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
 }

// deleteComment
function deleteComment(req, res) {
   console.log("deleteComment function called");
   var commentID = new mongo.ObjectID(req.body.commentID);
   var postID = new mongo.ObjectID(req.body.postID);
   var userID = new mongo.ObjectID(req.body.userID);
   console.log("Deleting Comment...");
   console.log(commentID);
   // Deleting entry in Post collection
   Post.updateMany(
     { _id: postID },
     { $pull: { comments: { _id: commentID } } },
     function (err, result) {
       if (err) throw err;
       // Deleting entry in Comment collection
       console.log("Comment in Post collection deleted");
       Comment.deleteOne({ _id: commentID }, function (err, result) {
         if (err) throw err;
         console.log("Comment in Comment collection deleted");
         });
       });
     }

// updateComment

// addCommentLike

// removeCommentLike

// getCommentLikeNumber

// getCommentNumber

module.exports = {
    // all functions
    addComment,
    deleteComment
};
