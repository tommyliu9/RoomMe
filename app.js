var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var firebase = require("firebase");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
var firebaseConfig = {
  apiKey: "AIzaSyCI69QI2spNa5Es6CrrVDuZyOwPxn8NZyk",
  authDomain: "roomme-7292b.firebaseapp.com",
  databaseURL: "https://roomme-7292b.firebaseio.com",
  projectId: "roomme-7292b",
  storageBucket: "roomme-7292b.appspot.com",
  messagingSenderId: "726943189056",
  appId: "1:726943189056:web:e78ccfc05aff26dc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
