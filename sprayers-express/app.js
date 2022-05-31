var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
require('dotenv').config(); 

var indexRouter = require('./routes/index');
var noteRouter = require('./routes/note');
var likeRouter = require('./routes/like');
var topicRouter = require('./routes/topic');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json({limit: "11mb"}));
app.use(bodyParser.urlencoded({limit: "11mb",extended: true}));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/api/note', noteRouter);
app.use('/api/like', likeRouter);
app.use('/api/topic', topicRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
