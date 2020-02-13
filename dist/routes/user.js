"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _CartController = _interopRequireDefault(require("../controller/CartController"));

var _Auth = _interopRequireDefault(require("../middleware/Auth"));

var _isUser = _interopRequireDefault(require("./../middleware/isUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/cart/create/:productId', [_Auth.default, _isUser.default], _CartController.default.AddProductCart);
router.get('/profile/carts', [_Auth.default, _isUser.default], _CartController.default.getUserCartProducts);
router.delete('/cart/:cartId/product/:productId', [_Auth.default, _isUser.default], _CartController.default.deleteProductFromCart);
var _default = router;
exports.default = _default;