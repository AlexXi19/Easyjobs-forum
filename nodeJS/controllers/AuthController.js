const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register Function
async function register(req, res) {
  // Hashing the password
  const salt = await bcrypt.genSaltSync(10);

  console.log("register function called");
  const password = await req.body.pw;

  bcrypt.hash(password, salt, function(err, hash) {

      //Creating a new user
      const newUser = new User({
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      });
      if (err) {
        console.log(err);
      } else {
        // Validating user
        User.find({ email: newUser.email }, function(err, docs) {
          if (docs.length == 0) {
            newUser.save();
            console.log("User saved");;
          } else {
            console.log("User already exists");
          }
        });
      }
      return res.redirect('/');
  });
};

// Login Function
function login(req, res) {
  console.log("login function called");

  // User inputted email and password
  const formEmail = req.body.email;
  const formPw = req.body.password;

  // Check if user exists
  User.find({ email: formEmail }, function(err, docs) {
    if (docs.length == 0) {
      console.log("User doesn't exist");
    } else {
      // Validate password
      const userPw = docs[0].password;
      bcrypt.compare(formPw, userPw, function(err, result) {
        if (err){
          console.log(err);
        }
        if (result) {
          ssn = req.session;
          ssn.email = formEmail;
          res.render('post', {currentUser: docs[0], User: User});
          console.log("password correct");
        } else {
          console.log("password incorrect");
          res.redirect('/');
        }
      });
    }
  });
};





module.exports = {
    register, login
};
