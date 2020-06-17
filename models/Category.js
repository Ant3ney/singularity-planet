//Category Model
var mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
	title: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog"
		}
	]
});

module.exports = mongoose.model("Category", categorySchema);