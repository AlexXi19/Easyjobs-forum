const User = require("../models/User");
var mongo = require("mongodb");

// addPostToUser

// deletePostFromUser

// name of user who is logged in is stored in frontend session cookies.
function getNamebyID(req, res) {
  var userID = new mongo.ObjectID(req.params.id);
  console.log("Sending User's name for id:  " + userID);
  User.find({ _id: userID }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      var name = docs[0].firstName + " " + docs[0].lastName;
      console.log("name " + name);
      res.send(name);
    }
  });
}
module.exports = {
  getNamebyID,
};
