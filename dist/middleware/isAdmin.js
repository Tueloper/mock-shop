"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sendResponse = require("./../utils/sendResponse");

var _default = (req, res, next) => {
  const {
    isAdmin
  } = req.userData; //check if user is an admin or not

  if (!isAdmin) return (0, _sendResponse.sendErrorResponse)(res, 400, 'You are Not Authorized');else next();
};

exports.default = _default;