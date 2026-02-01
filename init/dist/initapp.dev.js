"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var app = express();

var mongoose = require("mongoose");

var Listing = require("../models/listing");

var initData = require("./data");

var MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

function main() {
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect(MONGO_URL));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

main().then(function () {
  console.log("connected to DB");
})["catch"](function (err) {
  console.log(err);
});

function initDb() {
  return regeneratorRuntime.async(function initDb$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Listing.deleteMany({}));

        case 2:
          initData.data = initData.data.map(function (obj) {
            return _objectSpread({}, obj, {
              owner: '6969a0903a00c1720cc1fe28'
            });
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(Listing.insertMany(initData.data));

        case 5:
          console.log("data was initilized");

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}

initDb();