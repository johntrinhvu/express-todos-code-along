var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var todosRouter = require('./routes/todos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mount middleware into the middleware/request pipeline
// app.use([starts with path], <middleware fn> [,<middleware fn>])

app.use(function(req, res, next) {
  // add a time property to the res.locals object
  // time property will be accessing when rendering a view
  res.locals.time = new Date().toLocaleTimeString();
  next(); // pass the req to the next middleware

});



// log in the terminal the HTTP request info
app.use(logger('dev'));

// processes data sent in the body of the request if it's json
app.use(express.json());

// processes data sent in the "form" body of the request
// will create a property on req.body for each <input>, <select>, or <textarea>
// in the <form>
app.use(express.urlencoded({ extended: false }));

// adds a cookies property for each cookie in the request
app.use(cookieParser());

// if the req is for a static asset, returns the file
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// the first arg is the "starts with" path
// the paths within the routes modules are appended to the starts with paths
app.use('/', indexRouter);
app.use('/todos', todosRouter);

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
