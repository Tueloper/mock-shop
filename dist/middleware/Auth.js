"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("./../models"));

var _processToken = require("./../utils/processToken");

var _sendResponse = require("./../utils/sendResponse");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  User
} = _models.default;

var _default = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return (0, _sendResponse.sendErrorResponse)(res, 401, 'Authentication required');
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization; // return console.log(token)

    const {
      email
    } = (0, _processToken.verifyToken)(token);
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) return (0, _sendResponse.sendErrorResponse)(res, 401, 'User does not exist');
    req.userData = user.dataValues;
    req.token = token;
    next();
  } catch (err) {
    const error = err.message ? 'Authentication Failed' : err;
    next(error);
  }
};

exports.default = _default;