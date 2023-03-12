"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
const router = (0, _express.Router)();
router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});
router.get('/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
});
var _default = router;
exports.default = _default;