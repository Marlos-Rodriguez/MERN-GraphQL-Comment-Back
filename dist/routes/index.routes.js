"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var router = (0, _express.Router)(); //Routes

router.get("/", function (req, res) {
  res.send("World");
});
var _default = router;
exports["default"] = _default;