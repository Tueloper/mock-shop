"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendSuccessResponse = exports.sendErrorResponse = void 0;

const sendErrorResponse = (res, code, errorMessage) => res.status(code).send({
  status: 'error',
  error: errorMessage
});

exports.sendErrorResponse = sendErrorResponse;

const sendSuccessResponse = (res, code, data) => res.status(code).send({
  status: 'success',
  data
});

exports.sendSuccessResponse = sendSuccessResponse;