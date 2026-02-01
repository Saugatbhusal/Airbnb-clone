"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Review = require("./review");

var listingSchema = Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
listingSchema.post("findOneAndDelete", function _callee(listing) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!listing) {
            _context.next = 3;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(Review.deleteMany({
            _id: {
              $in: listing.reviews
            }
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
var Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;