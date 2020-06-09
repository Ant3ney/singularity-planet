var express = require("express");
var app = express();

//setting and getting info
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) =>{
	res.redirect("/blog");
})
app.get("/blog", (req, res) => {
	res.render("blog/index");
})

app.listen((process.env.PORT || 3000), process.env.IP, () => {
	console.log("Working");
})