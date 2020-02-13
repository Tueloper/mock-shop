"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("./../models"));

var _sendResponse = require("./../utils/sendResponse");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Product,
  Cart
} = _models.default;
/**
 * Product Controller.
 * 
 */

const CartController = {
  /**
   * 
   * @param {req.body} req 
   * @param {object} res 
   * 
   */
  async AddProductCart(req, res, next) {
    try {
      //retrive user
      const user = req.userData; //product to be added to the cart

      const product = await Product.findOne({
        where: {
          id: req.params.productId
        }
      });
      const cart = await Cart.create({
        userId: user.id,
        productId: product.id
      }); // return console.log(cart)

      return (0, _sendResponse.sendSuccessResponse)(res, 200, cart);
    } catch (e) {
      return (0, _sendResponse.sendErrorResponse)(res, 400, e);
    }
  },

  async getUserCartProducts(req, res) {
    try {
      const user = req.userData;
      const carts = await Cart.findAll({
        where: {
          userId: user.id
        } // include: [{
        //   model: Product,
        //   as: 'product'
        // }]

      });
      return (0, _sendResponse.sendSuccessResponse)(res, 200, carts);
    } catch (e) {
      return (0, _sendResponse.sendErrorResponse)(res, 400, e);
    }
  },

  async deleteProductFromCart(req, res) {
    try {
      const destroyableProduct = await Cart.findOne({
        where: {
          id: req.params.cartId,
          productId: req.params.productId
        }
      }); // return console.log(destroyableProduct)

      if (!destroyableProduct) return (0, _sendResponse.sendErrorResponse)(res, 400, 'Product does not exist');else await destroyableProduct.destroy();
      return (0, _sendResponse.sendSuccessResponse)(res, 200, {
        message: 'Product deleted Succeffully'
      });
    } catch (error) {
      return next(e);
    }
  }

};
var _default = CartController;
exports.default = _default;