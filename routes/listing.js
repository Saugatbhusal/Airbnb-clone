const express = require("express")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing")
const router = express.Router()
const flash = require("connect-flash")
const { isLoggedIn, validateListing, isOwner } = require("../middleware")
const listingController = require("../controllers/listing")
const multer = require('multer')
const { storage } = require("../cloudConfig")
const upload = multer({ storage })

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, validateListing, upload.single('listing[image]'), wrapAsync(listingController.createListing)) // it is working
    //but listing.image is undefined as files are handeeld by multer so i dont know why validation is not throwing error?

router.get("/new", isLoggedIn, listingController.renderNewForm)
    //Show route(if this was before new list route then then when calling /listings/new new would be treated like id and listing/new woind render  )
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, listingController.destroyListing)

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm))


module.exports = router;