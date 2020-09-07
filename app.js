//INITIALIZE
var express          = require("express");
var bodyParser       = require("body-parser");
var methodOverride   = require("method-override");
var expressSanitizer = require("express-sanitizer");
var User             = require("./models/user")
var passport         = require("passport");
var LocalStrategy    = require("passport-local");
var flash       	 = require("connect-flash");
const mongoose       = require("mongoose");


//DATABASE
mongoose.connect(process.env.DATABASEURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log("Connected to DB"))
	.catch(error => console.log(error.message));


//CONFIGURATE
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(require("express-session")({
	secret: "bruhuhruehhijbjahbrhurubruhkdkfaiou38y387534q9450qi1gr9f67qgfqoubfq0349u973ghqeroiyrg08q47hpo1ihrpquh747ihjkbyfrsbruh",
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//FLASH MESSAGES
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

//INIT ROUTES
var routes = require("./routes/blogs");
var authRoutes = require("./routes/auth");

//USE ROUTES
app.use(routes);
app.use(authRoutes);

//SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});