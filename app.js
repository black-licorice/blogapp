//INITIALIZE
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

//CONFIGURATE
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//INIT ROUTES
var routes = require("./routes/blogs");

//USE ROUTES
app.use(routes);

//SERVER
app.listen("3000", function(){
	console.log("server running on port 3000")
});