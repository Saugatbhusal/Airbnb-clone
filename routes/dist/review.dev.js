"use strict";

var express = require("express");

var router = express.Router({
  mergeParams: true
});

var Listing = require("../models/listing");

var Review = require("../models/review");

var methodOverride = require("method-override");

var wrapAsync = require("../utils/wrapAsync");

var _require = require("../middleware"),
    validateReview = _require.validateReview;

var _require2 = require("../middleware"),
    isLoggedIn = _require2.isLoggedIn,
    isReviewAuthor = _require2.isReviewAuthor;

var reviewController = require("../controllers/reviews");

var review = require("../models/review"); // add review route


router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview)); //Delete Review Route

router["delete"]("/:reviewId", isLoggedIn, isReviewAuthor, reviewController.destroyReview);
module.exports = router;