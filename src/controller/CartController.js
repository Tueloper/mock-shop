import models from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';

const {  Product, Cart } = models;

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
      const user = req.userData;

      //product to be added to the cart
      const product = await Product.findOne({
        where: {id: req.params.productId }
      });

      const cart = await Cart.create({
        userId: user.id
      })

      await product.update({
        cartId: cart.id || cartId
      })

    
      // return console.log(cart)

      return sendSuccessResponse(res, 200, cart );
    } catch (e) {
      return sendErrorResponse(res, 400, e);
    }
  },

  async getUserCartProducts(req, res ) {
    try {

      const user = req.userData;
      
      const carts = await Cart.findAll({
        where: { userId: user.id },
        // include: [{
        //   model: Product,
        //   as: 'product'
        // }]
      });

      return sendSuccessResponse( res, 200, carts )
    } catch (e) {
      return sendErrorResponse(res, 400, e);
    }
  },

  async deleteProductFromCart (req, res) {
    try {
      const destroyableProduct = await Cart.findOne({
        where: { 
          id: req.params.cartId,
          productId: req.params.productId
        }
      })
      // return console.log(destroyableProduct)
      if(!destroyableProduct) return sendErrorResponse(res, 400, 'Product does not exist')
      else await destroyableProduct.destroy();

      return sendSuccessResponse(res, 200, {
        message: 'Product deleted Succeffully'
      })
    } catch (error) {
      return next(e)
    }
  }
};

export default CartController;
