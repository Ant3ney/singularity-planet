var express = require("express");
var app = express();

app.get("/", (req, res) =>{
	res.send("works");
})

app.listen((process.env.PORT || 3000), process.env.IP, () => {
	console.log("Working");
})