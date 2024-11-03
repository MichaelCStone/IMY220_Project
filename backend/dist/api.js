"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _mongodb = require("mongodb");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // Michael Stone - u21497682
var router = _express["default"].Router();

//login a user
router.post('/login', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, username, password, userProfile;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return req.app.locals.profilesCollection.findOne({
            username: username
          });
        case 4:
          userProfile = _context.sent;
          if (userProfile) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            status: 'error',
            message: 'User not found'
          }));
        case 7:
          if (!(userProfile.password !== password)) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            status: 'error',
            message: 'Invalid credentials'
          }));
        case 9:
          return _context.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Login successful',
            profile: {
              simpleId: userProfile.simpleId,
              name: userProfile.name,
              bio: userProfile.bio,
              country: userProfile.country,
              picture: userProfile.picture,
              followers: userProfile.followers,
              following: userProfile.following,
              playlists: userProfile.playlists,
              username: userProfile.username,
              email: userProfile.email
              // Exclude password
            }
          }));
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          console.error("Error during login:", _context.t0);
          res.status(500).json({
            status: 'error',
            message: 'Login failed'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 12]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

//creating a new user
router.post('/signup', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, name, bio, country, picture, followers, following, playlists, username, password, email, existingUser, existingEmail, existingProfiles, newSimpleId, newProfile;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log("Received Data:", req.body);
          _req$body2 = req.body, name = _req$body2.name, bio = _req$body2.bio, country = _req$body2.country, picture = _req$body2.picture, followers = _req$body2.followers, following = _req$body2.following, playlists = _req$body2.playlists, username = _req$body2.username, password = _req$body2.password, email = _req$body2.email;
          _context2.prev = 2;
          _context2.next = 5;
          return req.app.locals.profilesCollection.findOne({
            username: username
          });
        case 5:
          existingUser = _context2.sent;
          _context2.next = 8;
          return req.app.locals.profilesCollection.findOne({
            email: email
          });
        case 8:
          existingEmail = _context2.sent;
          if (!existingEmail) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(409).json({
            status: 'error',
            message: 'Email already in use. Please use another email.'
          }));
        case 11:
          if (!existingUser) {
            _context2.next = 13;
            break;
          }
          return _context2.abrupt("return", res.status(409).json({
            status: 'error',
            message: 'Username already exists. Please choose another one.'
          }));
        case 13:
          _context2.next = 15;
          return req.app.locals.profilesCollection.find().toArray();
        case 15:
          existingProfiles = _context2.sent;
          newSimpleId = existingProfiles.length + 1; // Simple incrementing ID
          // Create new profile object
          newProfile = {
            simpleId: newSimpleId,
            name: name,
            bio: bio,
            country: country,
            picture: picture,
            followers: followers,
            following: following,
            playlists: playlists,
            username: username,
            password: password,
            //hashing?
            email: email
          };
          console.log("New profile object:", newProfile);
          _context2.next = 21;
          return req.app.locals.profilesCollection.insertOne(newProfile);
        case 21:
          res.status(201).json({
            status: 'success',
            message: 'Profile created successfully',
            profileId: newSimpleId
          });
          _context2.next = 28;
          break;
        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](2);
          console.error("Error inserting profile:", _context2.t0);
          res.status(500).json({
            status: 'error',
            message: 'Profile creation failed'
          });
        case 28:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 24]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

//Get all songs
router.get('/songs', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var songs;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return req.app.locals.songsCollection.find({}).toArray();
        case 3:
          songs = _context3.sent;
          res.json(songs);
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).send(_context3.t0.message);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

//Get all playlists
router.get('/playlists', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var playlists;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return req.app.locals.playlistsCollection.find({}).toArray();
        case 3:
          playlists = _context4.sent;
          res.json(playlists);
          _context4.next = 10;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(500).send(_context4.t0.message);
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

//Get a user's profile
router.get('/profiles/:username', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var username, profile;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          username = req.params.username;
          _context5.prev = 1;
          _context5.next = 4;
          return req.app.locals.profilesCollection.findOne({
            username: username
          });
        case 4:
          profile = _context5.sent;
          if (profile) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 7:
          return _context5.abrupt("return", res.status(200).json(profile));
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](1);
          console.error('Error fetching user:', _context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            message: 'Server error'
          }));
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 10]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

//update a user's profile
router.put('/profiles/:username', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var username, updatedProfileData, updatedUser;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          username = req.params.username;
          updatedProfileData = req.body;
          _context6.prev = 2;
          _context6.next = 5;
          return req.app.locals.profilesCollection.findOneAndUpdate({
            username: username
          }, {
            $set: updatedProfileData
          }, {
            returnDocument: "after"
          });
        case 5:
          updatedUser = _context6.sent;
          if (updatedUser) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 8:
          return _context6.abrupt("return", res.status(200).json(updatedUser));
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](2);
          console.error('Error updating user profile:', _context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            message: 'Server error'
          }));
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[2, 11]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

//View a specific playlist
router.get('/playlists/:playlistId', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var playlistId, playlist;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          playlistId = parseInt(req.params.playlistId);
          _context7.prev = 1;
          _context7.next = 4;
          return req.app.locals.playlistsCollection.findOne({
            simpleId: playlistId
          });
        case 4:
          playlist = _context7.sent;
          if (playlist) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'Playlist not found'
          }));
        case 7:
          return _context7.abrupt("return", res.status(200).json(playlist));
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](1);
          console.error('Error fetching playlist:', _context7.t0);
          return _context7.abrupt("return", res.status(500).json({
            message: 'Server error'
          }));
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 10]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());

//Add follower to my following list
router.post('/follow/:usernameToFollow', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var followerUsername, usernameToFollow, followerUser, userToFollow;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          followerUsername = req.body.username; // The user who wants to follow
          usernameToFollow = req.params.usernameToFollow;
          _context8.prev = 2;
          _context8.next = 5;
          return req.app.locals.profilesCollection.findOne({
            username: followerUsername
          });
        case 5:
          followerUser = _context8.sent;
          _context8.next = 8;
          return req.app.locals.profilesCollection.findOne({
            username: usernameToFollow
          });
        case 8:
          userToFollow = _context8.sent;
          if (!(!followerUser || !userToFollow)) {
            _context8.next = 11;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 11:
          if (!followerUser.following.includes(usernameToFollow)) {
            _context8.next = 13;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: 'You are already following this user'
          }));
        case 13:
          _context8.next = 15;
          return req.app.locals.profilesCollection.updateOne({
            username: followerUsername
          }, {
            $addToSet: {
              following: usernameToFollow
            }
          } // $addToSet prevents duplicates
          );
        case 15:
          _context8.next = 17;
          return req.app.locals.profilesCollection.updateOne({
            username: usernameToFollow
          }, {
            $addToSet: {
              followers: followerUsername
            }
          });
        case 17:
          return _context8.abrupt("return", res.status(200).json({
            message: "".concat(followerUsername, " is now following ").concat(usernameToFollow)
          }));
        case 20:
          _context8.prev = 20;
          _context8.t0 = _context8["catch"](2);
          console.error('Error following user:', _context8.t0);
          return _context8.abrupt("return", res.status(500).json({
            message: 'Server error'
          }));
        case 24:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[2, 20]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());

//unfollow a user
router["delete"]('/unfollow/:username', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var usernameToUnfollow, currentUser, user, userToUnfollow;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          usernameToUnfollow = req.params.username;
          currentUser = req.body.username;
          _context9.prev = 2;
          _context9.next = 5;
          return req.app.locals.profilesCollection.findOne({
            username: currentUser
          });
        case 5:
          user = _context9.sent;
          _context9.next = 8;
          return req.app.locals.profilesCollection.findOne({
            username: usernameToUnfollow
          });
        case 8:
          userToUnfollow = _context9.sent;
          if (!(!user || !userToUnfollow)) {
            _context9.next = 11;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 11:
          if (user.following.includes(usernameToUnfollow)) {
            _context9.next = 13;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            message: 'You are not following this user'
          }));
        case 13:
          user.following = user.following.filter(function (username) {
            return username !== usernameToUnfollow;
          });
          userToUnfollow.followers = userToUnfollow.followers.filter(function (username) {
            return username !== currentUser;
          });
          _context9.next = 17;
          return req.app.locals.profilesCollection.updateOne({
            username: currentUser
          }, {
            $set: {
              following: user.following
            }
          });
        case 17:
          _context9.next = 19;
          return req.app.locals.profilesCollection.updateOne({
            username: usernameToUnfollow
          }, {
            $set: {
              followers: userToUnfollow.followers
            }
          });
        case 19:
          return _context9.abrupt("return", res.status(200).json({
            message: "".concat(currentUser, " has unfollowed ").concat(usernameToUnfollow)
          }));
        case 22:
          _context9.prev = 22;
          _context9.t0 = _context9["catch"](2);
          console.error('Error unfollowing user:', _context9.t0);
          return _context9.abrupt("return", res.status(500).json({
            message: 'An error occurred while trying to unfollow'
          }));
        case 26:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[2, 22]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());

//Create a new Song
router.post('/addSong', /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body3, title, artist, album, genre, year, spotifyLink, songsCollection, songCount, newSong;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _req$body3 = req.body, title = _req$body3.title, artist = _req$body3.artist, album = _req$body3.album, genre = _req$body3.genre, year = _req$body3.year, spotifyLink = _req$body3.spotifyLink;
          songsCollection = req.app.locals.songsCollection;
          _context10.next = 5;
          return songsCollection.countDocuments();
        case 5:
          songCount = _context10.sent;
          newSong = {
            simpleId: songCount + 1,
            title: title,
            artist: artist,
            album: album,
            genre: genre,
            year: year,
            spotifyLink: spotifyLink
          };
          _context10.next = 9;
          return songsCollection.insertOne(newSong);
        case 9:
          res.status(201).json({
            message: 'Song added successfully',
            newSong: newSong
          });
          _context10.next = 16;
          break;
        case 12:
          _context10.prev = 12;
          _context10.t0 = _context10["catch"](0);
          console.error('Error unfollowing user:', _context10.t0);
          res.status(500).json({
            message: 'Error adding song',
            error: _context10.t0
          });
        case 16:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 12]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());

//Add a new playlist
router.post('/addPlaylist', /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var playlistsCollection, profilesCollection, _req$body4, name, picture, genre, author, category, hashtags, comments, description, songs, ownerId, validatedHashtags, validatedComments, validatedSongs, newSimpleId, newPlaylist, result, updateResult;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          playlistsCollection = req.app.locals.playlistsCollection;
          profilesCollection = req.app.locals.profilesCollection;
          _req$body4 = req.body, name = _req$body4.name, picture = _req$body4.picture, genre = _req$body4.genre, author = _req$body4.author, category = _req$body4.category, hashtags = _req$body4.hashtags, comments = _req$body4.comments, description = _req$body4.description, songs = _req$body4.songs, ownerId = _req$body4.ownerId; // Ensure the fields are arrays (default to empty arrays if missing)
          // const validatedHashtags = hashtags || [];
          // const validatedComments = comments || [];
          // const validatedSongs = songs || [];
          validatedHashtags = Array.isArray(hashtags) ? hashtags : [];
          validatedComments = Array.isArray(comments) ? comments : [];
          validatedSongs = Array.isArray(songs) ? songs : []; // Validate required fields (example)
          if (!(!name || !ownerId || !Array.isArray(validatedSongs))) {
            _context11.next = 9;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            message: 'Missing required fields or invalid data'
          }));
        case 9:
          _context11.next = 11;
          return playlistsCollection.countDocuments();
        case 11:
          _context11.t0 = _context11.sent;
          newSimpleId = _context11.t0 + 1;
          newPlaylist = {
            simpleId: newSimpleId,
            name: name,
            picture: picture,
            genre: genre,
            author: author,
            category: category,
            hashtags: validatedHashtags,
            comments: validatedComments,
            description: description,
            songs: validatedSongs,
            ownerId: ownerId
          };
          _context11.next = 16;
          return playlistsCollection.insertOne(newPlaylist);
        case 16:
          result = _context11.sent;
          if (!result.acknowledged) {
            _context11.next = 24;
            break;
          }
          _context11.next = 20;
          return profilesCollection.updateOne({
            simpleId: ownerId
          },
          // Assuming ownerId is the _id of the profile
          {
            $addToSet: {
              playlists: newSimpleId
            }
          } // Add the new playlist's simpleId
          );
        case 20:
          updateResult = _context11.sent;
          if (updateResult.modifiedCount === 1) {
            res.status(201).json({
              message: 'Playlist created successfully',
              playlist: newPlaylist
            });
          } else {
            // If the profile was not updated, return a warning
            res.status(200).json({
              message: 'Playlist created, but owners playlists not updated',
              playlist: newPlaylist
            });
          }
          _context11.next = 25;
          break;
        case 24:
          throw new Error('Failed to create playlist');
        case 25:
          _context11.next = 31;
          break;
        case 27:
          _context11.prev = 27;
          _context11.t1 = _context11["catch"](0);
          console.error('Error adding playlist:', _context11.t1);
          res.status(500).json({
            message: 'Error adding playlist',
            error: _context11.t1.message
          });
        case 31:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 27]]);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());

//Get all playlists of a specific profile
router.get('/playlists/user/:ownerId', /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var ownerId, profilePlaylists;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          ownerId = req.params.ownerId;
          _context12.next = 4;
          return req.app.locals.playlistsCollection.find({
            ownerId: parseInt(ownerId)
          }).toArray();
        case 4:
          profilePlaylists = _context12.sent;
          if (!(profilePlaylists.length === 0)) {
            _context12.next = 7;
            break;
          }
          return _context12.abrupt("return", res.json([]));
        case 7:
          // Return the playlists in the response
          res.json(profilePlaylists);
          _context12.next = 14;
          break;
        case 10:
          _context12.prev = 10;
          _context12.t0 = _context12["catch"](0);
          console.error('Error fetching playlists for user:', _context12.t0);
          res.status(500).json({
            message: 'Error fetching playlists',
            error: _context12.t0.message
          });
        case 14:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 10]]);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());

//delete a song
router["delete"]('/songs/:songId', /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var songId, result, updateResult;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          songId = parseInt(req.params.songId, 10);
          _context13.next = 4;
          return req.app.locals.songsCollection.findOneAndDelete({
            simpleId: songId
          });
        case 4:
          result = _context13.sent;
          if (result) {
            _context13.next = 7;
            break;
          }
          return _context13.abrupt("return", res.status(404).json({
            message: "Song not found"
          }));
        case 7:
          _context13.next = 9;
          return req.app.locals.playlistsCollection.updateMany({
            songs: songId
          },
          // Find playlists that include the song
          {
            $pull: {
              songs: songId
            }
          } // Remove the song from the songs array
          );
        case 9:
          updateResult = _context13.sent;
          if (updateResult.modifiedCount > 0) {
            console.log("Song with simpleId: ".concat(songId, " removed from ").concat(updateResult.modifiedCount, " playlist(s)."));
          }

          // res.status(200).json({ message: "Song deleted successfully" });

          res.status(200).json({
            message: "Song deleted successfully",
            playlistsUpdated: updateResult.modifiedCount
          });
          _context13.next = 18;
          break;
        case 14:
          _context13.prev = 14;
          _context13.t0 = _context13["catch"](0);
          console.error('Error deleting song:', _context13.t0);
          res.status(500).json({
            message: 'Error deleting song',
            error: _context13.t0.message
          });
        case 18:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 14]]);
  }));
  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());

//Delete my profile (and all of my playlists as well)
router["delete"]('/profiles/:simpleId', /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var simpleId, result;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          simpleId = parseInt(req.params.simpleId, 10);
          _context14.prev = 1;
          _context14.next = 4;
          return req.app.locals.playlistsCollection.deleteMany({
            ownerId: simpleId
          });
        case 4:
          _context14.next = 6;
          return req.app.locals.profilesCollection.findOneAndDelete({
            simpleId: simpleId
          });
        case 6:
          result = _context14.sent;
          if (result) {
            _context14.next = 9;
            break;
          }
          return _context14.abrupt("return", res.status(404).json({
            message: "Profile not found"
          }));
        case 9:
          res.status(200).json({
            message: "Profile and associated playlists deleted successfully"
          });
          _context14.next = 16;
          break;
        case 12:
          _context14.prev = 12;
          _context14.t0 = _context14["catch"](1);
          console.error('Error deleting profile and playlists:', _context14.t0);
          res.status(500).json({
            message: 'Error deleting profile and playlists',
            error: _context14.t0.message
          });
        case 16:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[1, 12]]);
  }));
  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());

//delete specific playlist of my profile
router["delete"]('/deletePlaylist/:simpleId/:ownerSimpleId', /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var playlistsCollection, profilesCollection, _req$params, simpleId, ownerSimpleId, playlist, deleteResult, updateResult;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          playlistsCollection = req.app.locals.playlistsCollection;
          profilesCollection = req.app.locals.profilesCollection;
          _req$params = req.params, simpleId = _req$params.simpleId, ownerSimpleId = _req$params.ownerSimpleId; // Find the playlist by simpleId
          _context15.next = 6;
          return playlistsCollection.findOne({
            simpleId: parseInt(simpleId)
          });
        case 6:
          playlist = _context15.sent;
          if (playlist) {
            _context15.next = 9;
            break;
          }
          return _context15.abrupt("return", res.status(404).json({
            message: 'Playlist not found'
          }));
        case 9:
          if (!(playlist.ownerId !== parseInt(ownerSimpleId))) {
            _context15.next = 11;
            break;
          }
          return _context15.abrupt("return", res.status(403).json({
            message: 'You can only delete your own playlists'
          }));
        case 11:
          _context15.next = 13;
          return playlistsCollection.deleteOne({
            simpleId: parseInt(simpleId)
          });
        case 13:
          deleteResult = _context15.sent;
          if (!(deleteResult.deletedCount === 1)) {
            _context15.next = 25;
            break;
          }
          _context15.next = 17;
          return profilesCollection.updateOne({
            simpleId: parseInt(ownerSimpleId)
          },
          // Match profile by simpleId
          {
            $pull: {
              playlists: parseInt(simpleId)
            }
          } // Remove the playlist's simpleId from the profile
          );
        case 17:
          updateResult = _context15.sent;
          if (!(updateResult.modifiedCount === 1)) {
            _context15.next = 22;
            break;
          }
          return _context15.abrupt("return", res.status(200).json({
            message: 'Playlist deleted successfully'
          }));
        case 22:
          return _context15.abrupt("return", res.status(200).json({
            message: 'Playlist deleted, but owner\'s profile was not updated'
          }));
        case 23:
          _context15.next = 26;
          break;
        case 25:
          throw new Error('Failed to delete playlist');
        case 26:
          _context15.next = 32;
          break;
        case 28:
          _context15.prev = 28;
          _context15.t0 = _context15["catch"](0);
          console.error('Error deleting playlist:', _context15.t0);
          res.status(500).json({
            message: 'Error deleting playlist',
            error: _context15.t0.message
          });
        case 32:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 28]]);
  }));
  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());

//add song to playlist
// router.put('/addSongsToPlaylist/:playlistId/:ownerId', async (req, res) => {

//     try 
//     {
//         const playlistsCollection = req.app.locals.playlistsCollection;
//         const profilesCollection = req.app.locals.profilesCollection;
//         const { songId } = req.body; // songId comes from the request body
//         const { playlistId, ownerId } = req.params; // playlistId and ownerId come from URL parameters

//         // Check if the playlist exists
//         const playlist = await playlistsCollection.findOne({ simpleId: parseInt(playlistId) });

//         if (!playlist) 
//         {
//             return res.status(404).json({ message: 'Playlist not found' });
//         }

//         // Check if the user is the owner of the playlist
//         if (playlist.ownerId !== parseInt(ownerId)) 
//         {
//             return res.status(403).json({ message: 'You can only modify your own playlists' });
//         }

//         // Ensure songId is provided
//         if (!songId) 
//         {
//             return res.status(400).json({ message: 'Missing required songId' });
//         }

//         // Check if the song is already in the playlist
//         if (playlist.songs.includes(parseInt(songId)))
//         {
//             return res.status(200).json({ message: 'Song is already in the playlist' });
//         }

//         // Add the song to the playlist's songs array
//         const updateResult = await playlistsCollection.updateOne(
//             { simpleId: parseInt(playlistId) }, 
//             { $addToSet: { songs: parseInt(songId) } } // $addToSet prevents duplicates
//         );

//         if (updateResult.modifiedCount === 1) 
//         {
//             res.status(200).json({ message: 'Song added to playlist successfully' });
//         } 
//         else 
//         {
//             throw new Error('Failed to add song to playlist');
//         }

//     } 
//     catch (error) 
//     {
//         console.error('Error adding song to playlist:', error);

//         res.status(500).json({ message: 'Error adding song to playlist', error: error.message });
//     }
// });
router.put('/addSongsToPlaylist/:playlistId/:ownerId', /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var playlistsCollection, profilesCollection, songIds, _req$params2, playlistId, ownerId, playlist, newSongIds, updateResult;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          playlistsCollection = req.app.locals.playlistsCollection;
          profilesCollection = req.app.locals.profilesCollection;
          songIds = req.body.songIds; // songIds should be an array of song IDs
          _req$params2 = req.params, playlistId = _req$params2.playlistId, ownerId = _req$params2.ownerId; // playlistId and ownerId come from URL parameters
          // Check if the playlist exists
          _context16.next = 7;
          return playlistsCollection.findOne({
            simpleId: parseInt(playlistId)
          });
        case 7:
          playlist = _context16.sent;
          if (playlist) {
            _context16.next = 10;
            break;
          }
          return _context16.abrupt("return", res.status(404).json({
            message: 'Playlist not found'
          }));
        case 10:
          if (!(playlist.ownerId !== parseInt(ownerId))) {
            _context16.next = 12;
            break;
          }
          return _context16.abrupt("return", res.status(403).json({
            message: 'You can only modify your own playlists'
          }));
        case 12:
          if (!(!Array.isArray(songIds) || songIds.length === 0)) {
            _context16.next = 14;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            message: 'Missing required songIds array'
          }));
        case 14:
          // Filter out any songs that are already in the playlist
          newSongIds = songIds.map(function (id) {
            return parseInt(id);
          }) // Ensure IDs are integers
          .filter(function (songId) {
            return !playlist.songs.includes(songId);
          });
          if (!(newSongIds.length === 0)) {
            _context16.next = 17;
            break;
          }
          return _context16.abrupt("return", res.status(200).json({
            message: 'All selected songs are already in the playlist'
          }));
        case 17:
          _context16.next = 19;
          return playlistsCollection.updateOne({
            simpleId: parseInt(playlistId)
          }, {
            $addToSet: {
              songs: {
                $each: newSongIds
              }
            }
          } // $each allows adding multiple items to $addToSet
          );
        case 19:
          updateResult = _context16.sent;
          if (!(updateResult.modifiedCount === 1)) {
            _context16.next = 24;
            break;
          }
          res.status(200).json({
            message: 'Songs added to playlist successfully'
          });
          _context16.next = 25;
          break;
        case 24:
          throw new Error('Failed to add songs to playlist');
        case 25:
          _context16.next = 31;
          break;
        case 27:
          _context16.prev = 27;
          _context16.t0 = _context16["catch"](0);
          console.error('Error adding songs to playlist:', _context16.t0);
          res.status(500).json({
            message: 'Error adding songs to playlist',
            error: _context16.t0.message
          });
        case 31:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 27]]);
  }));
  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());

//edit a playlist
router.put('/playlists/:id', /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var id, updates, updateData, playlistsCollection, result;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          id = req.params.id;
          updates = req.body; // Capture the updates from the request body
          // Prepare the update object
          updateData = {}; // Check for the fields in the request body and add them to updateData
          if (updates.name) updateData.name = updates.name;
          if (updates.picture) updateData.picture = updates.picture;
          if (updates.genre) updateData.genre = updates.genre;
          if (updates.category) updateData.category = updates.category;
          if (updates.hashtags) updateData.hashtags = updates.hashtags;
          if (updates.description) updateData.description = updates.description;

          // If no fields are provided for update, respond with an error
          if (!(Object.keys(updateData).length === 0)) {
            _context17.next = 11;
            break;
          }
          return _context17.abrupt("return", res.status(400).json({
            message: 'No fields to update'
          }));
        case 11:
          _context17.prev = 11;
          playlistsCollection = req.app.locals.playlistsCollection; // Attempt to find and update the playlist in the database
          _context17.next = 15;
          return playlistsCollection.updateOne({
            simpleId: parseInt(id)
          }, {
            $set: updateData // Use the dynamically created updateData object
          });
        case 15:
          result = _context17.sent;
          if (!(result.matchedCount === 0)) {
            _context17.next = 18;
            break;
          }
          return _context17.abrupt("return", res.status(404).json({
            message: 'Playlist not found'
          }));
        case 18:
          res.status(200).json({
            message: 'Playlist updated successfully'
          });
          _context17.next = 25;
          break;
        case 21:
          _context17.prev = 21;
          _context17.t0 = _context17["catch"](11);
          console.error(_context17.t0);
          res.status(500).json({
            message: 'An error occurred while updating the playlist'
          });
        case 25:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[11, 21]]);
  }));
  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}());

//Add Comment to a playlist
router.post('/playlists/:id/addComment', /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var id, _req$body5, author, content, playlistsCollection, result;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          id = req.params.id; // Get the playlist ID from the URL parameters
          _req$body5 = req.body, author = _req$body5.author, content = _req$body5.content; // Get the author and content from the request body
          // Validation to ensure author and content are provided
          if (!(!author || !content)) {
            _context18.next = 4;
            break;
          }
          return _context18.abrupt("return", res.status(400).json({
            message: 'Author and content are required'
          }));
        case 4:
          _context18.prev = 4;
          playlistsCollection = req.app.locals.playlistsCollection; // Attempt to find and update the playlist in the database
          _context18.next = 8;
          return playlistsCollection.updateOne({
            simpleId: parseInt(id)
          },
          // Find the playlist by simpleId
          {
            $push: {
              comments: {
                author: author,
                content: content
              } // Push the new comment to the comments array
            }
          });
        case 8:
          result = _context18.sent;
          if (!(result.matchedCount === 0)) {
            _context18.next = 11;
            break;
          }
          return _context18.abrupt("return", res.status(404).json({
            message: 'Playlist not found'
          }));
        case 11:
          res.status(200).json({
            message: 'Comment added successfully'
          });
          _context18.next = 18;
          break;
        case 14:
          _context18.prev = 14;
          _context18.t0 = _context18["catch"](4);
          console.error(_context18.t0);
          res.status(500).json({
            message: 'An error occurred while adding the comment'
          });
        case 18:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[4, 14]]);
  }));
  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}());
router.get('/songs/:simpleId', /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var simpleId, song;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          simpleId = parseInt(req.params.simpleId);
          _context19.prev = 1;
          _context19.next = 4;
          return req.app.locals.songsCollection.findOne({
            simpleId: simpleId
          });
        case 4:
          song = _context19.sent;
          if (song) {
            res.json(song);
          } else {
            res.status(404).json({
              message: 'Song not found'
            });
          }
          _context19.next = 12;
          break;
        case 8:
          _context19.prev = 8;
          _context19.t0 = _context19["catch"](1);
          console.error('Error fetching song:', _context19.t0);
          res.status(500).json({
            message: 'Server error'
          });
        case 12:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[1, 8]]);
  }));
  return function (_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;