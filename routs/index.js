//index routs
var express = require("express");
var router = express.Router();
var User = require("../models/User");
var passport = require("passport");

//Sign up routs
router.get("/register", (req, res) => {
	res.render("register");
});
router.post("/register", (req, res) => {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			console.log(err.message);
			return res.render("register");
		}
		else{
			passport.authenticate("local")(req, res, () => {
				res.redirect("/blog");
			});
		}
	})
});

router.get("/login", (req, res) => {
	res.render("login");
});

module.exports = router;