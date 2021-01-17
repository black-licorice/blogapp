//INITIALIZE
var express          = require("express");
var bodyParser       = require("body-parser");
var methodOverride   = require("method-override");
var expressSanitizer = require("express-sanitizer");
var User             = require("./models/user");
var passport         = require("passport");
var LocalStrategy    = require("passport-local");
var flash       	 = require("connect-flash");
var mongoose         = require("mongoose");
var path 			 = require("path");

//DATABASE
var URL = process.env.DATABASEURL || 'mongodb://localhost:27017/yelp-camp';
mongoose.connect(URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.connection.on('connected', function(){
	console.log('Connected to DB')
});
mongoose.connection.on('error', function(error){
	console.log(error.message);
});


//CONFIGURATE
var app = express();
var SECRET = process.env.SECRET || 'jvhadskljhgaslkjghipruhkjvn305zß948832zß8&$KGngw95'
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(require("express-session")({
	secret: SECRET,
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
var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log(`The app is running on port ${ PORT }`);
});