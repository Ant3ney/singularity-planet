//Blog routs
var express = require('express');
var router = express.Router();
var middleware = require('../middleware/index.js');
var mongoose = require('mongoose');
var Blog = require('../models/Blog');

router.get('/', (req, res) => {
   Blog.find({}, (err, allBlogs) => {
      if (err) {
         console.log('Something went wrong');
         console.log(err);
      } else {
         res.render('blog/index', { blogs: allBlogs });
      }
   });
});
router.get('/new', middleware.isAdmin, (req, res) => {
   res.render('blog/new');
});
router.post('/', (req, res) => {
   var postedBlog = middleware.assembleBlog(req);
   Blog.create(postedBlog, (err, newBlog) => {
      if (err) {
         console.log(err.message);
      } else {
         res.redirect('/blog');
      }
   });
});
//Show edit page
router.get('/:blogId/edit', (req, res) => {
   var blog_id = req.params.blogId;

   Blog.findById(blog_id, (err, blog) => {
      if (err) {
         console.log(err.message);
      } else {
         res.render('blog/edit', { blog: blog });
      }
   });
});
router.put('/:blogId', (req, res) => {
   var blog_id = req.params.blogId;
   var updatedBlog = middleware.assembleBlog(req);

   Blog.findByIdAndUpdate(blog_id, updatedBlog, (err, returnedBlog) => {
      if (err) {
         console.log(err.message);
      } else {
         res.redirect('/blog');
      }
   });
});
router.delete('/:blogId', (req, res) => {
   var blog_id = req.params.blogId;

   Blog.findByIdAndRemove(blog_id, (err, deletedBlog) => {
      if (err) {
         console.log(err.message);
      } else {
         res.redirect('/blog');
      }
   });
});
router.get('/:blogId', (req, res) => {
   var blog_id = req.params.blogId;
   Blog.findById(blog_id)
      .populate('comments')
      .exec((err, blog) => {
         if (err) {
            console.log(err.message);
         } else {
            res.render('blog/show', { blog: blog });
         }
      });
});

module.exports = router;
