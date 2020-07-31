"use strict";

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  username: String,
  password: String,
  email: String,
  createAt: {
    type: Date,
    "default": Date.now()
  }
});
module.exports = (0, _mongoose.model)("User", userSchema);