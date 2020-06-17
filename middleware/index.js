//index/msc middleware
var middleObj = {};
var Comment = require("../models/Comment");

middleObj.assembleBlog = (req) => {
	var newBlog = {
		title: req.body.title,
		image: req.body.image,
		preview: req.body.preview,
		content: req.body.content 
	}
	return newBlog;
}

middleObj.assembleComment = (req) => {
	var newComment = {
		user: req.user._id,
		username: req.user.username,
		comment: req.body.comment
	}
	return newComment;
}

middleObj.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

middleObj.checkCommentOwnership = (req, res, next) => {
	var comment_id = req.params.commentId;
	if(req.isAuthenticated()){
		Comment.findById(comment_id, (err, comment) => {
			if(err){
				console.log("Something went wrong\n" + err.message);
			}
			else{
				console.log("req.user: " + req.user);
				if(req.user._id.equals(comment.user)){
					return next();
				}
				else{
					console.log("user is not the same");
				}
			}
		});
	}
	else{
		res.redirect("/login");
	}
}

middleObj.isAdmin = (req, res, next) => {
	if(req.user){
		var type = req.user.type;
		if(type == "admin" || type == "owner"){
			return next();
		}
	}
	res.redirect("/blog");
}

middleObj.isAdminBool = (req, res, next) => {
	if(req.user){
		var type = req.user.type;
		if(type == "admin" || type == "owner"){
			return true;
		}
	}
	return false;
}

module.exports = middleObj;