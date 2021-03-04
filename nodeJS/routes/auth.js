const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');

// router.get...

router.post('/register', function(req, res){
  console.log("123");
});

module.exports = router;
