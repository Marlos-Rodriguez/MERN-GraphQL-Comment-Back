"use strict";

require("@babel/polyfill");

var _apolloServer = require("apollo-server");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _typeDefs = _interopRequireDefault(require("./graphql/typeDefs"));

var _resolvers = _interopRequireDefault(require("./graphql/resolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("dotenv").config({
  path: "variables.env"
});

var server = new _apolloServer.ApolloServer({
  typeDefs: _typeDefs["default"],
  resolvers: _resolvers["default"],
  context: function context(_ref) {
    var req = _ref.req;
    return {
      req: req
    };
  }
});

var conectarDB = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mongoose["default"].connect(process.env.DB_MONGO, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false
            });

          case 3:
            console.log("DB Conectada");
            _context.next = 11;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log("hubo un error");
            console.log(_context.t0);
            process.exit(1); // Detener la app

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function conectarDB() {
    return _ref2.apply(this, arguments);
  };
}();

var main = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return conectarDB();

          case 2:
            server.listen({
              port: process.env.PORT || 5000
            }).then(function (res) {
              console.log("Server running at ".concat(res.url));
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function main() {
    return _ref3.apply(this, arguments);
  };
}();

main();