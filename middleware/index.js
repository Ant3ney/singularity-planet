//index/msc middleware
var middleObj = {};

middleObj.assembleBlog = (req) => {
	var newBlog = {
		title: req.body.title,
		image: req.body.image,
		preview: req.body.preview,
		content: req.body.content 
	}
	return newBlog;
}
module.exports = middleObj;