"use strict";

var _require = require("./schema"),
    reviewSchema = _require.reviewSchema;

var _require2 = require("./schema"),
    listingSchema = _require2.listingSchema;

var Listing = require("./models/listing");

var ExpressError = require("./utils/ExpressError");

var Review = require("./models/review");

module.exports.isLoggedIn = function (req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing");
    return res.redirect("/login");
  }

  next();
};

module.exports.saveRedirectUrl = function (req, res, next) {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }

  next();
};

module.exports.validateListing = function (req, res, next) {
  console.log(req.body);

  var _listingSchema$valida = listingSchema.validate(req.body),
      error = _listingSchema$valida.error;

  if (error) {
    // throw new ExpressError(400, error)
    var errmessage = error.details.map(function (el) {
      return el.message;
    }).join(","); // after map functin runs we get array which gets joined

    throw new ExpressError(400, errmessage);
  } else {
    next();
  }
};

module.exports.validateReview = function (req, res, next) {
  var _reviewSchema$validat = reviewSchema.validate(req.body),
      error = _reviewSchema$validat.error;

  if (error) {
    var errmessage = error.details.map(function (el) {
      return el.message;
    }).join(",");
    throw new ExpressError(400, errmessage);
  } else {
    next();
  }
};

module.exports.isOwner = function _callee(req, res, next) {
  var id, listing;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(Listing.findById(id));

        case 3:
          listing = _context.sent;

          if (listing.owner._id.equals(res.locals.currUser._id)) {
            _context.next = 7;
            break;
          }

          req.flash("error", "You donot permisson to edit");
          return _context.abrupt("return", res.redirect("/listings/".concat(id)));

        case 7:
          next();

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.isReviewAuthor = function _callee2(req, res, next) {
  var _req$params, id, reviewId, review;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$params = req.params, id = _req$params.id, reviewId = _req$params.reviewId;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Review.findById(reviewId));

        case 3:
          review = _context2.sent;

          if (review.author.equals(res.locals.currUser._id)) {
            _context2.next = 7;
            break;
          }

          req.flash("error", "You are not the author of this review");
          return _context2.abrupt("return", res.redirect("/listings/".concat(id)));

        case 7:
          next();

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};