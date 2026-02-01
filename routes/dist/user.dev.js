"use strict";

var express = require("express");

var router = express.Router({
  mergeParams: true
});

var wrapAsync = require("../utils/wrapAsync");

var User = require("../models/user");

var passport = require("passport");

var _require = require("../middleware"),
    saveRedirectUrl = _require.saveRedirectUrl;

var userController = require("../controllers/users");

router.route("/signup").get(userController.renderSignupForm).post(wrapAsync(userController.signup));
router.route("/login").get(userController.renderLoginForm).post(saveRedirectUrl, passport.authenticate("local", {
  failureRedirect: '/login',
  failureFlash: true
}), userController.login);
router.get("/logout", userController.logout);
module.exports = router;