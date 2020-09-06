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
module.exports = mongoose.model("Blog", blogSchema);