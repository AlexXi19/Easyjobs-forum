const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// addPostToUser

// deletePostFromUser


function getNamebyID(req,res){
    console.log("why cannot"+req.params.id);
    User.find({ email: req.params.id }, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("name "+docs[0]);
            res.json(docs[0]);
        }
    });
}
module.exports = {
    getNamebyID
  
};
