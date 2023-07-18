"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _session = _interopRequireDefault(require("./session"));
var _user = _interopRequireDefault(require("./user"));
var _message = _interopRequireDefault(require("./message"));
var _dummy = _interopRequireDefault(require("./dummy"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = {
  session: _session.default,
  user: _user.default,
  message: _message.default,
  dummy: _dummy.default
};
exports.default = _default;