"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparePassword = exports.hashPassword = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Encrypts password to store in db
 * @param password
 */
const hashPassword = password => _bcryptjs.default.hashSync(password, _bcryptjs.default.genSaltSync(8));
/**
 * Compare inserted password with encrypted stored password
 * @param hashed
 * @param password
 */


exports.hashPassword = hashPassword;

const comparePassword = (hashed, password) => _bcryptjs.default.compareSync(hashed, password);

exports.comparePassword = comparePassword;