var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log("Connected to DB"))
	.catch(error => console.log(error.message));
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: 
	{
		type: Date,
		default: Date.now
	}
});
var Blog = mongoose.model("Blog", blogSchema);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());


app.get("/", function(req, res){
	res.redirect("/blog");
});

app.get("/blog", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("OH NO", err);
		}else{
			res.render("index", {blogs: blogs});
		}
	});
});

app.get("/blog/new", function(req, res){
	res.render("new")
});

app.post("/blog", function(req, res){
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
app.get("/blog/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			console.log("OH NO", err);
			res.redirect("/blog");
		}else{
			res.render("show", {blog: foundBlog});
		}
	});
});
app.get("/blog/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			console.log("OH NO", err);
		}else{
			res.render("edit", {blog: foundBlog});
		}
	});
});
app.put("/blog/:id", function(req, res){
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


app.delete("/blog/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log("OH NO", err);
		}else{
			res.redirect("/blog");
		}
	});
});

app.listen("3000", function(){
	console.log("server running on port 3000")
});