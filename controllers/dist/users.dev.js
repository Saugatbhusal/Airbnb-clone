"use strict";

var User = require("../models/user");

module.exports.renderSignupForm = function (req, res) {
  res.render("users/signup.ejs");
};

module.exports.renderLoginForm = function (req, res) {
  res.render("users/login");
};

module.exports.login = function _callee(req, res) {
  var redirectUrl;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req.flash("success", "Welcome back to Wanderlust");
          redirectUrl = res.locals.redirectUrl || "/listings";
          res.redirect(redirectUrl);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.logout = function (req, res) {
  req.logout(function (error) {
    if (error) {
      return next(error);
    }

    req.flash("success", "Logged you out!");
    res.redirect("/listings");
  });
};

module.exports.signup = function _callee2(req, res) {
  var _req$body, email, username, password, newUser, registeredUser;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, email = _req$body.email, username = _req$body.username, password = _req$body.password;
          newUser = new User({
            username: username,
            email: email
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.register(newUser, password));

        case 5:
          registeredUser = _context2.sent;
          req.login(registeredUser, function (err) {
            if (err) {
              return next(err);
            }

            req.flash("success", "Welcome to wanderlust");
            res.redirect("/listings");
          });
          _context2.next = 14;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          req.flash("error", _context2.t0.message);
          res.redirect("/signup");

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};