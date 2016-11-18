var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var app = express();

//Database setup
mongoose.connect('mongodb://heroku_wxczqc76:imjk7b86pchakedhjrt1rsquro@ds015750.mlab.com:15750/heroku_wxczqc76');
//mongoose.connect('mongodb://localhost/blog/');
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, '/sass'),
  dest: path.join(__dirname, '/public/stylesheets'),
  prefix: '/stylesheets',
  indentedSyntax: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

// routing setup

app.get('/', function (req, res) {
  res.render('index', { title: 'Eric G Turner' });
});

app.post('/api/addPost', function(req, res) {
  var newPost = Post({
    title: req.body.title,
    body: req.body.body
  });
  newPost.insert(function(err) {
    if (err) throw err;
  });
  console.log("posted: " + newPost);
  res.end();
});

app.get('/api/posts', function (req, res) {
  return Post.find(function (err, posts) {
    if (!err) {
      return res.send(posts);
    } else {
      return console.log(err);
    }
  });
});

app.get('/api/:id', function (req, res) {
  return Post.findById(req.params.id, function (err, post) {
    if (!err) {
      return res.send(post);
    } else {
      return console.log(err);
    }
  });
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/addPost', function(req, res) {
  res.render('addPost');
});

app.get('/:id', function(req, res) {
  res.render('blogPost');
});

app.get('*', function (req, res) {
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
