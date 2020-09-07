//INITIALIZE
var express  = require("express");
var router   = express.Router({mergeParams: true});
var passport = require("passport");
var User     = require("../models/user");


//GET REGISTER FORM
router.get("/register", function(req, res){
	res.render("authViews/register.ejs");
});
//REGISTER LOGIC
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			return res.render("authViews/register.ejs", {"error": err.message});
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to RESTful Blogs " + user.username);
			res.redirect("/blog");
		});
	});
});
//GET LOGIN FORM
router.get("/login", function(req, res){
	res.render("authViews/login.ejs");
});
//LOGIN LOGIC
router.post("/login", passport.authenticate("local", {
	successRedirect: "/blog",
	failureRedirect: "/login"
}), function(req, res){
});
//LOGOUT
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged out");
	res.redirect("/blog");
});

//EXPORTS
module.exports = router;