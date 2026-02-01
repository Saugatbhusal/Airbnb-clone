"use strict";

var express = require("express");

var methodOverride = require("method-override");

var ejsMate = require("ejs-mate");

var wrapAsync = require("../utils/wrapAsync");

var Listing = require("../models/listing");

var router = express.Router();

var flash = require("connect-flash");

var _require = require("../middleware"),
    isLoggedIn = _require.isLoggedIn,
    validateListing = _require.validateListing,
    isOwner = _require.isOwner;

var listingController = require("../controllers/listing");

var multer = require('multer');

var _require2 = require("../cloudConfig"),
    storage = _require2.storage;

var upload = multer({
  storage: storage
});
router.route("/").get(wrapAsync(listingController.index)).post(isLoggedIn, validateListing, upload.single('listing[image]'), wrapAsync(listingController.createListing)); // it is working
//but listing.image is undefined as files are handeeld by multer so i dont know why validation is not throwing error?

router.get("/new", isLoggedIn, listingController.renderNewForm); //Show route(if this was before new list route then then when calling /listings/new new would be treated like id and listing/new woind render  )

router.route("/:id").get(wrapAsync(listingController.showListing)).put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))["delete"](isLoggedIn, isOwner, listingController.destroyListing); //edit route

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
module.exports = router;