"use strict";

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _apolloServer = require("apollo-server");

var _validators = require("../../utils/validators");

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("dotenv").config({
  path: "variables.env"
});

var generateToken = function generateToken(user) {
  return _jsonwebtoken["default"].sign({
    id: user.id,
    email: user.email,
    username: user.username
  }, process.env.SECRET_KEY, {
    expiresIn: "1h"
  });
};

module.exports = {
  Mutation: {
    login: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var username, password, _validateLoginInput, errors, valid, user, match, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = _ref.username, password = _ref.password;
                //Validate User Data
                _validateLoginInput = (0, _validators.validateLoginInput)(username, password), errors = _validateLoginInput.errors, valid = _validateLoginInput.valid;
                _context.next = 4;
                return _User["default"].findOne({
                  username: username
                });

              case 4:
                user = _context.sent;

                if (valid) {
                  _context.next = 7;
                  break;
                }

                throw new _apolloServer.UserInputError("Errors", {
                  errors: errors
                });

              case 7:
                if (user) {
                  _context.next = 10;
                  break;
                }

                errors.general = "User not Found";
                throw new _apolloServer.UserInputError("User not found", {
                  errors: errors
                });

              case 10:
                _context.next = 12;
                return _bcryptjs["default"].compare(password, user.password);

              case 12:
                match = _context.sent;

                if (match) {
                  _context.next = 16;
                  break;
                }

                errors.general = "Wrog Credetials";
                throw new _apolloServer.UserInputError("Wrog Credetials", {
                  errors: errors
                });

              case 16:
                //Create the token
                token = generateToken(user); //Return the info

                return _context.abrupt("return", _objectSpread(_objectSpread({}, user._doc), {}, {
                  id: user._id,
                  token: token
                }));

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }(),
    register: function () {
      var _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref2) {
        var _ref2$registerInput, username, email, password, confirmPassword, _validateRegisterInpu, valid, errors, user, newUser, res, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref2$registerInput = _ref2.registerInput, username = _ref2$registerInput.username, email = _ref2$registerInput.email, password = _ref2$registerInput.password, confirmPassword = _ref2$registerInput.confirmPassword;
                //Validate user data
                _validateRegisterInpu = (0, _validators.validateRegisterInput)(username, email, password, confirmPassword), valid = _validateRegisterInpu.valid, errors = _validateRegisterInpu.errors;

                if (valid) {
                  _context2.next = 4;
                  break;
                }

                throw new _apolloServer.UserInputError("Errors", {
                  errors: errors
                });

              case 4:
                _context2.next = 6;
                return _User["default"].findOne({
                  username: username
                });

              case 6:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 9;
                  break;
                }

                throw new _apolloServer.UserInputError("Username is taken", {
                  errors: {
                    username: "This username is taken"
                  }
                });

              case 9:
                _context2.next = 11;
                return _bcryptjs["default"].hash(password, 12);

              case 11:
                password = _context2.sent;
                //Create the new user
                newUser = new _User["default"]({
                  email: email,
                  username: username,
                  password: password,
                  createAt: new Date().toISOString()
                }); //Save in the DB

                _context2.next = 15;
                return newUser.save();

              case 15:
                res = _context2.sent;
                //Create the token
                token = generateToken(res); //Return the info

                return _context2.abrupt("return", _objectSpread(_objectSpread({}, res._doc), {}, {
                  id: res._id,
                  token: token
                }));

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function register(_x3, _x4) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }
};