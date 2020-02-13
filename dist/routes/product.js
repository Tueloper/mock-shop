"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _ProductController = _interopRequireDefault(require("./../controller/ProductController"));

var _Auth = _interopRequireDefault(require("./../middleware/Auth"));

var _isAdmin = _interopRequireDefault(require("./../middleware/isAdmin"));

var _upload = _interopRequireDefault(require("./../utils/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/product/create', [_upload.default.single('avatar'), _Auth.default, _isAdmin.default], _ProductController.default.createProduct);
router.get('/products', _ProductController.default.getAllProducts);
router.patch('/product/update/:id', [_upload.default.single('avatar'), _Auth.default, _isAdmin.default], _ProductController.default.updateProduct);
router.delete('/product/delete/:id', [_Auth.default, _isAdmin.default], _ProductController.default.deleteProduct);
var _default = router;
exports.default = _default;