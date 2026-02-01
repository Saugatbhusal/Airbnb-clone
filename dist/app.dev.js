"use strict";

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

var express = require("express");

var app = express();

var mongoose = require("mongoose");

var Listing = require("./models/listing");

var path = require("path");

var methodOverride = require("method-override");

var ejsMate = require("ejs-mate");

var ExpressError = require("./utils/ExpressError");

var session = require("express-session");

var MongoStore = require('connect-mongo')["default"]; // console.log(MongoStore.create);


var Review = require("./models/review");

var listingRouter = require("./routes/listing");

var reviewsRouter = require("./routes/review");

var userRouter = require("./routes/user");

var flash = require("connect-flash");

var passport = require("passport");

var LocalStrategy = require("passport-local");

var User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express["static"](path.join(__dirname, "/public")));
var dburl = process.env.ATLUSDB_URL;

function main() {
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect(dburl));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

main().then(function () {
  console.log("connected to DB");
})["catch"](function (err) {
  console.log(err);
});
var store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 3600
});
store.on("error", function () {
  console.log("Error on Mongo session store", err);
});
var sessionOption = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};
app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; // used for dynamic visibility of login, logout, signup href on navbar

  next();
}); // app.get("/", (req, res) => {
//     res.send("Hi i am working at /")
// })
//router ot lisitngs

app.use("/listings", listingRouter);
app.use("/listings/:id/review", reviewsRouter);
app.use("/", userRouter);
app.use(function (err, req, res, next) {
  var _err$statusCode = err.statusCode,
      statusCode = _err$statusCode === void 0 ? 500 : _err$statusCode,
      _err$message = err.message,
      message = _err$message === void 0 ? "Something went wrong" : _err$message;
  res.status(statusCode).render("error", {
    message: message
  });
});
app.listen(8080, function () {
  console.log("Listenig at port 8080");
});