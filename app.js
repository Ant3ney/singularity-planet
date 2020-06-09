var express = require("express");
var app = express();

app.get("/", (req, res) =>{
	res.send("works");
})

app.listen((process.env.port || 3000), process.env.ip, () => {
	console.log("Working");
})