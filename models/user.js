//INITIALIZE
const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


//DATABASE
mongoose.connect(process.env.DATABASEURL, {
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