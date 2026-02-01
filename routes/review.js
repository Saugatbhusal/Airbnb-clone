const express = require("express")
const router = express.Router({ mergeParams: true })
const Listing = require("../models/listing")
const Review = require("../models/review")
const methodOverride = require("method-override")
const wrapAsync = require("../utils/wrapAsync");
const { validateReview } = require("../middleware")
const { isLoggedIn, isReviewAuthor } = require("../middleware")
const reviewController = require("../controllers/reviews")
const review = require("../models/review")


// add review route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview))
    //Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewController.destroyReview)
module.exports = router