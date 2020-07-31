"use strict";

var _apolloServer = require("apollo-server");

var _Post = _interopRequireDefault(require("../../models/Post"));

var _checkAuth3 = _interopRequireDefault(require("../../utils/check-auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = {
  Mutation: {
    createComment: function () {
      var _createComment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref, context) {
        var postId, body, _checkAuth, username, post;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                postId = _ref.postId, body = _ref.body;
                _checkAuth = (0, _checkAuth3["default"])(context), username = _checkAuth.username;

                if (!(body.trim() === "")) {
                  _context.next = 4;
                  break;
                }

                throw new _apolloServer.UserInputError("Empty comment", {
                  errors: {
                    body: "Comment body must not empty"
                  }
                });

              case 4:
                _context.next = 6;
                return _Post["default"].findById(postId);

              case 6:
                post = _context.sent;

                if (!post) {
                  _context.next = 14;
                  break;
                }

                post.comments.unshift({
                  body: body,
                  username: username,
                  createAt: new Date().toISOString()
                });
                _context.next = 11;
                return post.save();

              case 11:
                return _context.abrupt("return", post);

              case 14:
                throw new _apolloServer.UserInputError("Post not found");

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createComment(_x, _x2, _x3) {
        return _createComment.apply(this, arguments);
      }

      return createComment;
    }(),
    deleteComment: function () {
      var _deleteComment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref2, context) {
        var postId, commentId, _checkAuth2, username, post, commentIndex;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                postId = _ref2.postId, commentId = _ref2.commentId;
                _checkAuth2 = (0, _checkAuth3["default"])(context), username = _checkAuth2.username;
                _context2.prev = 2;
                _context2.next = 5;
                return _Post["default"].findById(postId);

              case 5:
                post = _context2.sent;

                if (!post) {
                  _context2.next = 18;
                  break;
                }

                commentIndex = post.comments.findIndex(function (c) {
                  return c.id === commentId;
                });

                if (!(post.comments[commentIndex].username === username)) {
                  _context2.next = 15;
                  break;
                }

                post.comments.splice(commentIndex, 1);
                _context2.next = 12;
                return post.save();

              case 12:
                return _context2.abrupt("return", post);

              case 15:
                throw new _apolloServer.AuthenticationError("Action not allowed");

              case 16:
                _context2.next = 19;
                break;

              case 18:
                throw new _apolloServer.UserInputError("Post not found");

              case 19:
                _context2.next = 24;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](2);
                throw new _apolloServer.AuthenticationError(_context2.t0);

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 21]]);
      }));

      function deleteComment(_x4, _x5, _x6) {
        return _deleteComment.apply(this, arguments);
      }

      return deleteComment;
    }()
  }
};