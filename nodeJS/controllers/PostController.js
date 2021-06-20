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
    var userID = new mongo.ObjectID(req.body.userID);

  // Determined whether to increase or decrease
  var increase = true;
  if (increase) {
    var value = 1;
  } else {
    var value = -1;
  }
  Post.find({ _id: postID }, function (err, docs) {
    // Asserting that the likesNum is equal to the number of userIDs
    // This should be the last step of the entire process
    // Ideally should never be called
    Post.aggregate(
      [
        { $match: { _id: postID } },
        { $project: { likes: { $size: "$likes" } } },
      ],
      function (err, docs1) {
        var numLikes = docs1[0].likes;
        if (numLikes != docs[0].likesNum) {
          console.log(numLikes);
          console.log(docs[0]);
          console.log(
            "Assertion error: number of elements in likes array is not equal to likesNum"
          );
          console.log("Resetting likeNum...");
          Post.updateOne(
            { _id: postID },
            { $set: { likesNum: numLikes } },
            function (err, result) {
              if (err) throw err;
              console.log("Reset likeNum complete");
            }
          );
        }
      }
    );
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
  });
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

    // Add postID to User model
    docs[0].posts.push(newPost._id);
    docs[0].save();
    console.log("post added to User.posts");
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
  console.log("Finding All Post with User" + userID);
  console.log("getAllPostsByUser function called");
  User.find({ _id: userID }, function (err, docs) {
    var postArray = docs[0].posts;
    Post.find({
        '_id': { $in: postArray}
    }, function(err, docs){
         console.log(docs);
         console.log("post by user"+postArray);
         res.json(docs);
    });
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
  console.log(postID);
  Post.find({ _id: req.params.id }, function (err, docs) {
    console.log(docs)
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
    { $pull: { posts: postID } },
    function (err, result) {
      if (err) throw err;
      // Deleting entry in Post collection
      Post.deleteOne({ _id: postID }, function (err, result) {
        if (err) throw err;
        User.find({ email: ssn.email }, function (err, docs) {
          // Delete all the comments replying to the post
          Comment.deleteMany({ postID: postID }, function (err) {
            if (err) throw err;
            console.log("All related comments removed");
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
// updatePost in user collection. The below code considers User's posts are the entire post instead of just id.
// User.updateOne(
//   { email: ssn.email },
//   {
//     $set: {
//       "posts.$[element].title": req.body.PostTitle,
//       "posts.$[element].content": req.body.PostContent,
//     },
//   },
//   { arrayFilters: [{ "element._id": { $eq: postID } }] },
//   function (err, result) {
//     if (err) throw err;
//     console.log("Updated User");
//     // updatePost in post collection
//     Post.updateOne(
//       { _id: postID },
//       {
//         $set: {
//           title: req.body.PostTitle,
//           content: req.body.PostContent,
//         },
//       },
//       function (err, result) {
//         if (err) throw err;
//         console.log("Updated post");
//       }
//     );
//   }
// );
// }


// getPostLikeNumber


module.exports = {
  // all functions
  addPost,
  deletePost,
  getAllPosts,
  getPostByID,
  getUserByPost,
  getAllPostsByUser,
  updatePost,
  addLike,
};
