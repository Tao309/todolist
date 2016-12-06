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
		//_id: Schema.ObjectId,
		_id: String,
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

app.post('/additem',function(req, res) {
	var oneItem = new mongoose.Schema({
		//_id: Schema.ObjectId,
		//_id: String,
		title: String,
		status: Boolean,
		date: String
	});
	var item = mongoose.model('list', oneItem);
	
	var dataSend = {
		title: req.body.title,
		status: req.body.status,
		date: req.body.date
	};
	
	
	new item(dataSend).save(function (err, fluffy) {
		if (err) return console.error(err);
		res.send('Added!');
	});

	
	
	
	/*
	
	var oneItem = new mongoose.Schema({
		_id: String,
		title: String,
		status: Boolean,
		date: String
	});
	var item = db.model("list",oneItem);
	new item(dataSend).save(function(err,data) {
		if(err) {res.json(err);} else {
			res.send('Added!');
		}
	});
	db.item.insert(req.body,function(err,data) {
		res.json(data);
	});
	*/
});

app.listen(3000, function() {
	console.log("Started at port: 3000");
});