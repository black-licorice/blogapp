//INITIALIZE
const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


//DATABASE
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log("Users connected to DB"))
	.catch(error => console.log(error.message));


//SCHEMA
var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});


//EXPORT
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);