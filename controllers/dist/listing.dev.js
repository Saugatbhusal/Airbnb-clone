"use strict";

var Listing = require("../models/listing");

module.exports.index = function _callee(req, res) {
  var alllistings;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Listing.find());

        case 2:
          alllistings = _context.sent;
          res.render("listings/index", {
            alllistings: alllistings
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.renderNewForm = function (req, res) {
  res.render("listings/new");
};

module.exports.showListing = function _callee2(req, res) {
  var id, listing;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Listing.findById(id).populate({
            path: "reviews",
            populate: {
              path: "author"
            }
          }).populate("owner"));

        case 3:
          listing = _context2.sent;

          if (listing) {
            _context2.next = 7;
            break;
          }

          req.flash("error", "This listing you are looking for doesnot exist!");
          return _context2.abrupt("return", res.redirect("/listings"));

        case 7:
          res.render("listings/show", {
            listing: listing
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.createListing = function _callee3(req, res) {
  var url, filename, newListing;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          url = req.file.path;
          filename = req.file.filename;
          newListing = new Listing(req.body.listing);
          newListing.owner = req.user._id;
          newListing.image = {
            url: url,
            filename: filename
          };
          _context3.next = 7;
          return regeneratorRuntime.awrap(newListing.save());

        case 7:
          req.flash("success", "New listing Created");
          res.redirect("/listings");

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports.renderEditForm = function _callee4(req, res) {
  var id, listing, originalUrl;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Listing.findById(id));

        case 3:
          listing = _context4.sent;

          if (listing) {
            _context4.next = 7;
            break;
          }

          req.flash("error", "This listing you are looking for doesnot exist!");
          return _context4.abrupt("return", res.redirect("/listings"));

        case 7:
          originalUrl = listing.image.url;
          console.log(originalUrl);
          originalUrl = originalUrl.replace("/upload", "/upload/h_250,w_250");
          console.log(originalUrl);
          res.render("listings/edit", {
            listing: listing,
            originalUrl: originalUrl
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports.updateListing = function _callee5(req, res) {
  var id, newlisting, updatedlisting, url, filename;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          newlisting = req.body.listing;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Listing.findByIdAndUpdate(id, newlisting, {
            "new": false
          }));

        case 4:
          updatedlisting = _context5.sent;

          if (!(typeof req.file != "undefined")) {
            _context5.next = 11;
            break;
          }

          url = req.file.path;
          filename = req.file.filename;
          updatedlisting.image = {
            url: url,
            filename: filename
          };
          _context5.next = 11;
          return regeneratorRuntime.awrap(updatedlisting.save());

        case 11:
          req.flash("success", "Listing Updated");
          res.redirect("/listings/".concat(id));

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports.destroyListing = function _callee6(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Listing.findByIdAndDelete(id));

        case 3:
          req.flash("success", "Listing Deleted");
          res.redirect("/listings");

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
}; //https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60