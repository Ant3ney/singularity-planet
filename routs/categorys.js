//Category routs
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Category = require("../models/Category");
var Blog = require("../models/Blog");

//show edit category
router.get("/:categoryId/edit", (req, res) => {
	var category_index = req.params.categoryId;
	Category.find({}).populate("blogs").exec((err, categorys) => {
		if(err){
			console.log(err.message);
		}
		else{
			Blog.find({}, (err, allBlogs) => {
				res.render("category/edit", {category: categorys[category_index], index: category_index, blogs: allBlogs});
			});
		}
	});
});

//show category
router.get("/:categoryId", (req, res) => {
	var category_index = req.params.categoryId;
	Category.find({}).populate("blogs").exec((err, categorys) => {
		if(err){
			console.log("Something went wrong in the category show route")
			console.log(err.message);
		}
		else{
			
			res.render("../views/category/show", {category: categorys[category_index], index: category_index});
		}
	});
});

//add blog to category
router.post("/:categoryId/manageCategory/:blog_id", (req, res) => {
	var category_index = req.params.categoryId;
	var blog_id = req.params.blog_id;
	Category.find({}, (err, categorys) => {
		if(err){
			console.log("Something went wrong\n" + err.message);
		}
		else{
			Blog.findById(blog_id, (err, blog) => {
				categorys[category_index].blogs.push(blog);
				categorys[category_index].save();
				res.redirect("/blog/category/" + category_index + "/edit");
			})
		}
	});
});

//remove blog from category
router.delete("/:categoryId/manageCategory/:blog_id", (req, res) => {
	var category_index = req.params.categoryId;
	var blog_id = req.params.blog_id;
	Category.find({}).populate("blogs").exec((err, categorys) => {
		categorys[category_index].blogs.forEach((blog, index) => {
			if(blog._id == blog_id){
				categorys[category_index].blogs.splice(index, 1);
				categorys[category_index].save();
				res.redirect("/blog/category/" + category_index + "/edit");
			}
		})
	});
});

module.exports = router;