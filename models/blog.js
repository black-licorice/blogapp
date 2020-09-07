const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASEURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log("Blogs connected to DB"))
	.catch(error => console.log(error.message));
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: 
	{
		type: Date,
		default: Date.now
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
});
module.exports = mongoose.model("Blog", blogSchema);