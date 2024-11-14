var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var flash = require("express-flash");
var session = require("express-session");
const Memorystore = require('session-memory-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataSurveiRouter = require('./routes/data_survei');
var permasalahanRouter = require('./routes/permasalahan');
var perbaikanRouter = require('./routes/perbaikan');
var pelangganRouter = require('./routes/pelanggan');
var profileRouter = require('./routes/profile');
var petugasRouter = require('./routes/petugas');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookie: {
    maxAge: 60000,
    secure: false,
    httpOnly: true,
    sameSite: 'strict',
    //domain: 'domainkitananti.com'
  },
  store: new session.MemoryStore(),
  saveUninitialized: true,
  resave: true,
  secret: 'secret'
}))

app.use(flash())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/data_survei', dataSurveiRouter);
app.use('/permasalahan', permasalahanRouter);
app.use('/perbaikan', perbaikanRouter);
app.use('/pelanggan', pelangganRouter);
app.use('/profile', profileRouter);
app.use('/petugas', petugasRouter);

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
