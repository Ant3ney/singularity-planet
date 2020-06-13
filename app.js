var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/User");
var blogRouts = require("./routs/blogs");
var indexRouts = require("./routs/index");

//mongoose.connect('mongodb://localhost:27017/SingularityBlog', { useNewUrlParser: true });
//export DATABASEURL=mongodb://localhost:27017/SingularityBlog
//SingularityBlog
mongoose.connect(process.env.DATABASEURL, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
	console.log("mongoose server is up");
}).catch(err => {
	console.log(err.message);
});

//setting and getting info
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

//Passport configuration
app.use(require("express-session")({
	secret: "The singularity blog value",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Route Configuration
app.use("/blog", blogRouts);
app.use(indexRouts);

//Passport configuration p2
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) =>{
	res.redirect("/blog");
});

app.listen((process.env.PORT || 3000), process.env.IP, () => {
	console.log("Working");
});