var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Schema = mongoose.Schema;

//Database setup
mongoose.connect('mongodb://heroku_wxczqc76:imjk7b86pchakedhjrt1rsquro@ds015750.mlab.com:15750/heroku_wxczqc76');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connection successful");
});

var blogSchema = new Schema({
  title:  String,
  body:   String,
  date: { type: Date, default: Date.now },
});

var Post = mongoose.model('Post', blogSchema);

router.get('/about', function(req, res) {
  res.render('about');
});

router.get('/blogPost', function(req, res) {
  res.render('blogPost');
});

router.get('/blog/posts', function (req, res){
  return Post.find(function (err, posts) {
    if (!err) {
      return res.send(posts);
    } else {
      return console.log(err);
    }
  });
});

router.get('/blog/addPost', function(req, res) {
  res.render('addPost');
});

router.post('blog/addPost', function(req, res) {
  new Post({title: req.body.title, author: req.body.body}).save();
});

router.get('/blog/:id', function (req, res){
  return Post.findById(req.params.id, function (err, post) {
    if (!err) {
      return res.send(post);
    } else {
      return console.log(err);
    }
  });
});

module.exports = router;
