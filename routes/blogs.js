//INITIALIZE
var express = require("express");
var router = express();
var Blog = require("../models/blog");
const mongoose = require("mongoose");

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
router.get("/blog/new", function(req, res){
	res.render("new")
});
//post logic
router.post("/blog", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
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
router.get("/blog/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			console.log("OH NO", err);
		}else{
			res.render("edit", {blog: foundBlog});
		}
	});
});
//update
router.put("/blog/:id", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			console.log("OH NO", err);
			res.redirect("/blog");
		}else{
			res.redirect("/blog/" + req.params.id);
		}
	});
});
//destroy
router.delete("/blog/:id", function(req, res){
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