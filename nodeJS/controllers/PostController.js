const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const UserController = require("./UserController");
var mongo = require("mongodb");

// addLike

// addPost
function addPost(req, res) {
  console.log("addPost function called");
  User.find({ email: ssn.email }, function (err, docs) {
    var userID = docs[0]._id;
    // Uses Post Title and Post content from request
    // Uses User ID from current session
    // Adding to Post and User is separate but adds the same object (?)

    const newPost = new Post({
      userID: userID,
      title: req.body.PostTitle,
      content: req.body.PostContent,
    });

    // Add post to Post model
    newPost.save();
    console.log("post saved to Post");

    // Add post to User model
    docs[0].posts.push(newPost);
    docs[0].save();
    console.log("post added to User.posts");
    res.render("post", { currentUser: docs[0] });
  });
}

// addComment
function addComment(req, res) {
  console.log("addComment function called");
  // Adds comment to comment collection
  User.find({ email: ssn.email }, function (err, docs) {
    // Obtaining values from front end
    var currentUserID = docs[0]._id;
    var currentContent = req.body.commentContent_pre;
    // None means this is the first comment to a post
    if (req.body.replyComment_pre == "None") {
      var currentReplyToID = null;
    } else {
      var currentReplyToID = new mongo.ObjectID(req.body.replyComment_pre);
    }
    var currentPostID = new mongo.ObjectID(req.body.replyPost_pre);

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
          // Adding the comment object to the posts array in users
          User.update(
            { email: ssn.email },
            { $pull: { posts: { _id: currentPostID } } },
            function (err, result) {
              if (err) throw err;
              docs[0].posts.push(docs1[0]);
              docs[0].save();
              User.find({ email: ssn.email }, function (err, docs) {
                console.log("Add comment redirecting...");
                console.log(docs);
                res.render("post", { currentUser: docs[0] });
              });
            }
          );
        }
      );
    });
  });
}

// getAllPosts
function getAllPosts(req, res) {
  console.log("getAllPosts function called");
  Post.find({}, function (err, docs) {
    var postArray = docs;
    console.log("Sending Posts");
    res.json(postArray);
  });
}

// getAllPostsByUser
function getAllPostsByUser(req, res) {
  console.log("getAllPostsByUser function called");
  User.find({ email: ssn.email }, function (err, docs) {
    var postArray = docs[0].posts;
  });
}

// getPostByID
function getPostByID(req, res) {
  // Returns post object
  console.log("getPostByID function called");
  console.log("Finding Post with ID: " + req.params.id);
  // var postID = new mongo.ObjectID(null);
  Post.find({ _id: req.params.id }, function (err, docs) {
    var postArray = docs[0];
    console.log("Found Post, sending Post details");
    res.json(docs[0]);
  });
}

// getUserByPost
function getUserByPost(req, res) {
  // Returns user object with postID as input
  console.log("getUserByPost function called");
  // var postID = new mongo.ObjectID(null);
  var postID = new mongo.ObjectID(req.params.id);
  Post.find({ _id: req.params.id }, function (err, docs) {
    var userID = new mongo.ObjectID(docs[0].userID);
    User.find({ _id: userID }, function (err, docs) {
      var user = docs[0];
      console.log("Found User, sending User details");
      res.json(user);
    });
  });
}

// deletePost
function deletePost(req, res) {
  console.log("deletePost function called");
  //var postID = new mongo.ObjectID(req.body.postID_pre);
  var postID = new mongo.ObjectID(req.body.postID);
  console.log("Deleting...");
  console.log(postID);
  // Deleting entry in user collection

  User.updateMany(
    { email: ssn.email },
    { $pull: { posts: { _id: postID } } },
    function (err, result) {
      if (err) throw err;
      Post.deleteOne({ _id: postID }, function (err, result) {
        if (err) throw err;
        User.find({ email: ssn.email }, function (err, docs) {
          // Delete all the comments replying to the post
          Comment.deleteMany({ postID: postID }, function (err) {
            if (err) throw err;
            console.log("All related comments removed");
            res.render("post", { currentUser: docs[0] });
          });
        });
      });
    }
  );
}

// updatePost

// removeLike

// removeComment

// getPostLikeNumber

// getCommentNumber

module.exports = {
  // all functions
  addPost,
  deletePost,
  addComment,
  getAllPosts,
  getPostByID,
  getUserByPost,
};
