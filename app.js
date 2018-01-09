var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var port = process.env.PORT || 8000
var app = express();
mongoose.Promise = require('bluebird');
var path = require('path');
app.use(bodyParser.json());



// use sessions for tracking logins
app.use(session({
  secret: 'Crypto loves you',
  resave: true,
  saveUninitialized: false
}));

// make user ID available in templates
app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

// mongodb connection
mongoose.connect("mongodb://localhost:27017/coinSense");
var db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));



//URL : http://localhost:3000/images/
// To get all the images/files stored in MongoDB
app.get('/images', function (req, res) {
  //calling the function from index.js class using routes object..
  routes.getImages(function (err, genres) {
    if (err) {
      throw err;

    }
    res.json(genres);

  });
});

// URL : http://localhost:3000/images/(give you collectionID)
// To get the single image/File using id from the MongoDB
app.get('/images/:id', function (req, res) {

  //calling the function from index.js class using routes object..
  routes.getImageById(req.params.id, function (err, genres) {
    if (err) {
      throw err;
    }
    //res.download(genres.path);
    res.send(genres.path)
  });
});
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
