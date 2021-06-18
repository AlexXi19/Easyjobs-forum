const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const UserController = require("./UserController");
var mongo = require("mongodb");

// addLike
function addLike(req, res) {
    console.log("addLike function called");
    var postID = new mongo.ObjectID(req.body.postID);
    // GET USER ID
    var userID = ssn.email;

    // Determined whether to increase or decrease
    var increase = true;
    if (increase) {
      var value = 1;
    } else {
      var value = -1
    }
    Post.find(
      { _id: postID }, function (err, docs) {
        // Asserting that the likesNum is equal to the number of userIDs
        // This should be the last step of the entire process
        // Ideally should never be called
        Post.aggregate([{$match: {_id: postID}}, {$project: {likes: {$size: '$likes'}}}],
        function (err, docs1) {
          var numLikes = docs1[0].likes;
          if (numLikes != docs[0].likesNum) {
            console.log(numLikes);
            console.log(docs[0]);
            console.log("Assertion error: number of elements in likes array is not equal to likesNum");
            console.log("Resetting likeNum...")
            Post.updateOne(
              { _id: postID },
              { $set: { likesNum: numLikes } },
              function (err, result) {
                if (err) throw err;
                console.log("Reset likeNum complete");
              }
            )
          }
        });
      // Asserting that the userID is not already in the array
      // Double insurance
      if (docs[0].likes.includes(userID)) {
        console.log("User already liked");
      } else {
        // Adds or removes from the array
        if (increase) {
          docs[0].likes.push(userID);
          docs[0].save();
        } else {
          docs[0].likes.pull(userID);
          docs[0].save();
        }

      // Updating the like number for the post (increasing/decreasing by one)
      Post.updateOne(
        { _id: postID },
        { $inc: { likesNum: value } },
        function (err, result) {
          if (err) throw err;
          console.log("likesNum incremented successfully");
        }
      );
      }
      }
    )
}


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
    var currentReplyToID = null;
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
    console.log(docs);
    res.json(postArray);
  });
}

// getAllPostsByUser
function getAllPostsByUser(req, res) {
  var userID = new mongo.ObjectID(req.params.id);
  console.log("Finding All Post with User"+userID);
  console.log("getAllPostsByUser function called");
  User.find({ _id: userID }, function (err, docs) {
    var postArray = docs[0].posts;
    console.log("post by user"+postArray);
    res.json(postArray);
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

  // ?? Unused variable?
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
  console.log("Deleting Post...");
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
function updatePost(req, res) {
  console.log("updatePost function called");
  var postID = new mongo.ObjectID(req.body.postID);

  Post.find({ _id: req.body.postID }, function (err, docs) {
    console.log(req.body.postID);
    console.log("Title: ");
    console.log(docs[0]);
  });
  // updatePost in user collection
  User.updateOne(
    { email: ssn.email },
    {
      $set: {
        "posts.$[element].title": req.body.PostTitle,
        "posts.$[element].content": req.body.PostContent,
      },
    },
    { arrayFilters: [{ "element._id": { $eq: postID } }] },
    function (err, result) {
      if (err) throw err;
      console.log("Updated User");
      // updatePost in post collection
      Post.updateOne(
        { _id: postID },
        {
          $set: {
            title: req.body.PostTitle,
            content: req.body.PostContent,
          },
        },
        function (err, result) {
          if (err) throw err;
          console.log("Updated post");
        }
      );
    }
  );
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
         User.find({ _id: userID }, function (err, docs) {
           // Delete all the comments replying to the post
           docs[0].posts
             res.render("post", { currentUser: docs[0] });
           });
         });
       });
     }
   );
 }


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
  getAllPostsByUser,
  updatePost,
  addLike
};
