"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uuid = require("uuid");
var _express = require("express");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const router = (0, _express.Router)();
router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});
router.get('/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});
router.post('/', (req, res) => {
  const id = (0, _uuid.v4)();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id
  };
  req.context.models.messages[id] = message;
  return res.send(message);
});
router.delete('/:messageId', (req, res) => {
  const _req$context$models$m = req.context.models.messages,
    _req$params$messageId = req.params.messageId,
    {
      [_req$params$messageId]: message
    } = _req$context$models$m,
    otherMessages = _objectWithoutProperties(_req$context$models$m, [_req$params$messageId].map(_toPropertyKey));
  req.context.models.messages = otherMessages;
  return res.send(message);
});
var _default = router;
exports.default = _default;