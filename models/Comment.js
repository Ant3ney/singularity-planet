//Comment model
var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	username: String,
	comment: String
});

module.exports = mongoose.model("Comment", commentSchema);