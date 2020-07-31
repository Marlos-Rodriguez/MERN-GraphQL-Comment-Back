"use strict";

var _mongoose = require("mongoose");

var PostSchema = new _mongoose.Schema({
  body: String,
  username: String,
  createAt: String,
  comments: [{
    body: String,
    username: String,
    createAt: String
  }],
  likes: [{
    username: String,
    createAt: String
  }],
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});
module.exports = (0, _mongoose.model)("Post", PostSchema);