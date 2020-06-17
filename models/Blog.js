//Blog model
var mongoose = require("mongoose");

//Schema setup
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	preview: String,
	content: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Blog", blogSchema);