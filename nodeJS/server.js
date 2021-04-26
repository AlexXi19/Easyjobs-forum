const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const authRoute = require('./routes/auth');
// const postsRoute = require('./routes/posts');
const path = require("path");
const morgan = require("morgan");
const http = require("http");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const AuthContoller = require("./controllers/AuthController");
const PostController = require("./controllers/PostController");
const UserController=require("./controllers/UserController");
const app = express();
const passport = require("passport");
var cors = require("cors");
app.use(cors());

const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(proxy("/api/*", { target: "http://localhost:5000/" }));
};

console.log("in");

app.use(passport.initialize()); //use passport and initialize passport package

app.use(passport.session());

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader(
    "Content-Type",
    "text/plain",
    "Access-Control-Allow-Origin: *",
    "Access-Control-Allow-Methods: POST, GET, OPTIONS"
  );
  res.end("app.js");
});

// Database

mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

db.on("error", function (err) {
  console.log(err);
});

db.once("open", function (err) {
  console.log("Database Connection Established!");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "html");

app.set("view engine", "ejs");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routing to functions
app.use("/register", AuthContoller.register);
app.use("/login", AuthContoller.login);
app.use("/addPost", PostController.addPost);
app.use("/deletePost", PostController.deletePost);
app.use("/addComment", PostController.addComment);

app.use("/getAllPosts", PostController.getAllPosts);
app.use("/getPostByID/:id", PostController.getPostByID);
app.use("/getUserByPost/:id", PostController.getUserByPost);
app.use('/getNamebyID/:id',UserController.getNamebyID);
app.use('/getAllPostsByUser/:id',PostController.getAllPostsByUser);

// app.use('/register',(req, res) => {
//     console.log("niubile");
//     console.log(req.body);
//     console.log(res.data);
//     res.send({ message: "We did it!" });
// });

passport.serializeUser(function (user, done) {
  done(null, user.UserID);
});
