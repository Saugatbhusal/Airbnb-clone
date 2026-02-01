"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = require("joi"),
    string = _require.string,
    required = _require.required;

var mongoose = require("mongoose");

var passportLocalMongoose = require('passport-local-mongoose')["default"];

var Schema = mongoose.Schema;
console.log("Type:", _typeof(passportLocalMongoose));
var userSchema = new Schema({
  email: {
    type: String,
    required: true
  }
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);