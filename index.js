var express = require('express');
var parser = require('body-parser');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://user45:KJhdueew2@ds119718.mlab.com:19718/todoexample');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB connected");
});

app.use(express.static(__dirname + '/public'));

app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

app.get('/',function(req,res) {
	res.render('body.ejs');
});

app.get('/list/',function(req,res) {
	var oneItem = new mongoose.Schema({
		title: String,
		status: Boolean,
		date: String
	});
	var list = db.model("list",oneItem);
	
	list.find(function(err, data) {
		console.log(data);
		res.send(data);
	});
});

app.post('/additem/',function(req, res) {
	var oneItem = new mongoose.Schema({
		title: String,
		status: Boolean,
		date: String
	});
	var item = db.model("Item",oneItem);
	
	db.list.insert(req.body,function(err,data) {
		res.json(data);
	});
});

app.listen(3000, function() {
	console.log("Started at port: 3000");
});