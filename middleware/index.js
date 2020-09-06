//INITIALIZE
var Blog = require("../models/blog");


//MIDDLEWARE OBJECT
var middlewareObj = {};


//AUTHENTICATION
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please Login First");
	res.redirect("/login");
}

//BLOG POST AUTHORISATION
middlewareObj.isAuthor = function(req, res, next){
	if(req.isAuthenticated()){
		Blog.findById(req.params.id, function(err, foundBlog){
			if(err || !foundBlog){
				req.flash("error", "Blog not found...");
				res.redirect("back");
			}else{
				if(foundBlog.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You don't have permission to do that...");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error", "You need to be logged in to do that...");
		res.redirect("back");
	}
}

//EXPORTS
module.exports = middlewareObj;