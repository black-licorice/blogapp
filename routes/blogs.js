//INITIALIZE
var express    = require("express");
var router     = express.Router({mergeParams: true});
var Blog       = require("../models/blog");
const mongoose = require("mongoose");
var middleWare = require("../middleware");

//ROUTES
router.get("/", function(req, res){
	res.redirect("/blog");
});
//index
router.get("/blog", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("OH NO", err);
		}else{
			res.render("index", {blogs: blogs});
		}
	});
});
//new
router.get("/blog/new", middleWare.isLoggedIn, function(req, res){
	res.render("new");
});
//post logic
router.post("/blog", function(req, res){
	req.body.body = req.sanitize(req.body.body);
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var title = req.body.title;
	var image = req.body.image;
	var body = req.body.body;
	var newBlog = {title: title, image: image, body: body, author: author};
	Blog.create(newBlog, function(err, newlyCreated){
		if(err){
			console.log("OH NO", err);
			res.render("new");
		}else{
			res.redirect("/blog");
		}
	});
});
//show
router.get("/blog/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			console.log("OH NO", err);
			res.redirect("/blog");
		}else{
			res.render("show", {blog: foundBlog});
		}
	});
});
//edit
router.get("/blog/:id/edit", middleWare.isAuthor, function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			console.log("OH NO", err);
		}else{
			res.render("edit", {blog: foundBlog});
		}
	});
});
//update
router.put("/blog/:id", middleWare.isAuthor, function(req, res){
	req.body.body = req.sanitize(req.body.body);
	var title = req.body.title;
	var image = req.body.image;
	var body = req.body.body;
	var updateBlog = {title: title, image: image, body: body};
	Blog.findByIdAndUpdate(req.params.id, updateBlog, function(err, updatedBlog){
		if(err){
			console.log("OH NO", err);
			res.redirect("/blog");
		}else{
			res.redirect("/blog/" + req.params.id);
		}
	});
});
//destroy
router.delete("/blog/:id", middleWare.isAuthor, function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log("OH NO", err);
		}else{
			res.redirect("/blog");
		}
	});
});

//EXPORTS
module.exports = router;