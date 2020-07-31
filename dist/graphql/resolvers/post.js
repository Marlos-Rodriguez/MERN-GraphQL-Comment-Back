"use strict";

var _apolloServer = require("apollo-server");

var _Post = _interopRequireDefault(require("../../models/Post"));

var _checkAuth2 = _interopRequireDefault(require("../../utils/check-auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = {
  Query: {
    getPosts: function () {
      var _getPosts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var posts;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Post["default"].find().sort({
                  createAt: -1
                });

              case 3:
                posts = _context.sent;
                return _context.abrupt("return", posts);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                throw new Error(err);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function getPosts() {
        return _getPosts.apply(this, arguments);
      }

      return getPosts;
    }(),
    getPost: function () {
      var _getPost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref) {
        var postId, post;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                postId = _ref.postId;
                _context2.prev = 1;
                _context2.next = 4;
                return _Post["default"].findById(postId);

              case 4:
                post = _context2.sent;

                if (!post) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", post);

              case 9:
                throw new Error("Post no found");

              case 10:
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](1);
                throw new Error(_context2.t0);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 12]]);
      }));

      function getPost(_x, _x2) {
        return _getPost.apply(this, arguments);
      }

      return getPost;
    }()
  },
  Mutation: {
    createPost: function () {
      var _createPost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref2, context) {
        var body, user, newPost, post;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                body = _ref2.body;
                user = (0, _checkAuth2["default"])(context);

                if (!(body.trim() === "")) {
                  _context3.next = 4;
                  break;
                }

                throw new Error("Post Body must not be empty");

              case 4:
                newPost = new _Post["default"]({
                  body: body,
                  user: user.id,
                  username: user.username,
                  createAt: new Date().toISOString()
                });
                _context3.next = 7;
                return newPost.save();

              case 7:
                post = _context3.sent;
                return _context3.abrupt("return", post);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createPost(_x3, _x4, _x5) {
        return _createPost.apply(this, arguments);
      }

      return createPost;
    }(),
    deletePost: function () {
      var _deletePost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref3, context) {
        var postId, user, post;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                postId = _ref3.postId;
                user = (0, _checkAuth2["default"])(context);
                _context4.prev = 2;
                _context4.next = 5;
                return _Post["default"].findById(postId);

              case 5:
                post = _context4.sent;

                if (!(user.username === post.username)) {
                  _context4.next = 12;
                  break;
                }

                _context4.next = 9;
                return post["delete"]();

              case 9:
                return _context4.abrupt("return", "Post deleted successfully");

              case 12:
                throw new _apolloServer.AuthenticationError("Action not allowed");

              case 13:
                _context4.next = 18;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](2);
                throw new _apolloServer.AuthenticationError(_context4.t0);

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 15]]);
      }));

      function deletePost(_x6, _x7, _x8) {
        return _deletePost.apply(this, arguments);
      }

      return deletePost;
    }(),
    likePost: function () {
      var _likePost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref4, context) {
        var postId, _checkAuth, username, post;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                postId = _ref4.postId;
                _checkAuth = (0, _checkAuth2["default"])(context), username = _checkAuth.username;
                _context5.prev = 2;
                _context5.next = 5;
                return _Post["default"].findById(postId);

              case 5:
                post = _context5.sent;

                if (!post) {
                  _context5.next = 13;
                  break;
                }

                if (post.likes.find(function (like) {
                  return like.username === username;
                })) {
                  //Post already like, unlike it
                  post.likes = post.likes.filter(function (like) {
                    return like.username !== username;
                  });
                } else {
                  //Not liked, like post
                  post.likes.push({
                    username: username,
                    createAt: new Date().toISOString()
                  });
                }

                _context5.next = 10;
                return post.save();

              case 10:
                return _context5.abrupt("return", post);

              case 13:
                throw new _apolloServer.UserInputError("Post not found");

              case 14:
                _context5.next = 19;
                break;

              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5["catch"](2);
                throw new _apolloServer.AuthenticationError(_context5.t0);

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 16]]);
      }));

      function likePost(_x9, _x10, _x11) {
        return _likePost.apply(this, arguments);
      }

      return likePost;
    }()
  }
};