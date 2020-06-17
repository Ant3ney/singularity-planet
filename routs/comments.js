//Comment Routs
var express = require("express");
var router = express.Router({mergeParams: true});
var Blog = require("../models/Blog");
var middleware = require("../middleware/index");
var Comment = require("../models/Comment");

router.post("/", middleware.isLoggedIn, (req, res) => {
	var blog_id = req.params.blogId;
	Blog.findById(blog_id, (err, blog) => {
		if(err){
			console.log("Something went wrong\n" + err.message);
		}
		else{
			var newComment = middleware.assembleComment(req);
			Comment.create(newComment, (err, comment) => {
				if(err){
					console.log("Something went wrong\n" + err.message);
				}
				else{
					blog.comments.push(comment);
					blog.save();
					res.redirect("/blog/" + blog_id);
				}
			});	
		}
	});
});

//delete comment
router.delete("/:commentId", middleware.checkCommentOwnership, (req, res) => {
	var blog_id = req.params.blogId;
	var comment_id = req.params.commentId;
	
	Comment.findByIdAndRemove(comment_id, (err, comment) => {
		if(err){
			console.log("Something went wrong\n" + err.message);
		}
		else{
			res.redirect("back");
		}
	})
	
});

module.exports = router;