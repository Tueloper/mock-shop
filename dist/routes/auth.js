"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _AuthController = _interopRequireDefault(require("../controller/AuthController"));

var _Auth = _interopRequireDefault(require("../middleware/Auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/auth/signup', _AuthController.default.signUp);
router.post('/auth/signin', _AuthController.default.signIn);
router.get('/auth/me', _Auth.default, _AuthController.default.me);
router.delete('/auth/logout', _Auth.default, _AuthController.default.logout);
var _default = router;
exports.default = _default;