"use strict";

var _apolloServer = require("apollo-server");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("dotenv").config({
  path: "variables.env"
});

module.exports = function (context) {
  //Context = {... headers}
  var authHeader = context.req.headers.authorization;

  if (authHeader) {
    //Bearer ....
    var token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        var user = _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY);

        return user;
      } catch (error) {
        throw new _apolloServer.AuthenticationError("Invalid/Expired token");
      }
    }

    throw new Error("Authentication token must be 'Bearer [token]");
  }

  throw new Error("Authorization header must be provided");
};