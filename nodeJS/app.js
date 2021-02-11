const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const path = require('path');
const morgan = require('morgan');
const http = require('http');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const AuthContoller = require('./controllers/AuthController');
const PostController = require('./controllers/PostController');
const app = express();
const passport = require('passport');


app.use(passport.initialize()); //use passport and initialize passport package

app.use(passport.session());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('app.js');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// Database

mongoose.connect('mongodb://127.0.0.1:27017/testdb',
  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const db = mongoose.connection;

db.on('error', function(err) {
    console.log(err);
});

db.once('open', function(err) {
    console.log('Database Connection Established!');
});

app.get("/", function(req, res) {
    res.sendFile(__dirname +"/index.html");
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'html');

app.set("view engine", "ejs");


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Routing to functions
app.use('/register', AuthContoller.register);
app.use('/login', AuthContoller.login);
app.use('/addPost', PostController.addPost);
app.use('/deletePost', PostController.deletePost);
app.use('/addComment', PostController.addComment);



passport.serializeUser(function(user, done) {

    done(null, user.UserID);
});
