import models from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';

const {  Product, Cart, CartDetail } = models;

// Returns token for logged in user.
const deductQuantity = async (resQuantity) => {
  await product.update({
    quantity: parseInt(product.quantity) - parseInt(resQuantity) || product.quantity
  })
};

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
  async AddProductCart(req, res) {
    try {
      
      //retrive user
      const user = req.userData;

      //product to be added to the cart
      const product = await Product.findOne({
        where: {id: req.params.productId }
      });

      if( product.quantity < req.body.quantity ) {
        return sendErrorResponse(res, 404, 'That amout of product is unavialable')
      }

      const cart = await Cart.findOne({ where: { userId: user.id }})

    
      // return console.log(cartDetails)

      // logic starts here
      if (!cart) {

        const newCart = await Cart.create({
          userId: user.id
        })
        const cartDetail = await CartDetail.create({
          cartId: newCart.id,
          productId: product.id,
          quantity: req.body.quantity
        });
        await product.update({
          quantity: parseInt(product.quantity) - parseInt(req.body.quantity) || product.quantity
        })
        return sendSuccessResponse(res, 200, cartDetail );
        
      }else {

        const cartDetails = await CartDetail.findOne({
          where: {
            productId: product.id,
            cartId: cart.id
          }
        })
        if (!cartDetails) {
           
          // return console.log(cart)
          const updatedCartDetails = await CartDetail.create({
            cartId: cart.id,
            productId: product.id,
            quantity: req.body.quantity
          });
  
          // return console.log(updatedCartDetails)
          await product.update({
            quantity: parseInt(product.quantity) - parseInt(req.body.quantity) || product.quantity
          })
  
          return sendSuccessResponse(res, 200, updatedCartDetails );

        }else if ( cartDetails.productId === product.id ) {

          const updatedCartDetails = await cartDetails.update({
            quantity: parseInt(req.body.quantity )+ parseInt(cartDetails.quantity) || cartDetails.quantity
          })
          await product.update({
            quantity: parseInt(product.quantity) - parseInt(req.body.quantity) || product.quantity
          })
          return sendSuccessResponse(res, 200, updatedCartDetails );
  
        } 
      }
    } catch (e) {
      console.log(e)
      return sendErrorResponse(res, 400, e.message);
    }
  },

  async getUserCartProducts(req, res ) {
    try {

      const user = req.userData;
      
      const cart = await Cart.findAll({
        where: { userId: user.id }
      });
      
      // return console.log(cart[0].id)

      const cartdetails = await CartDetail.findAll({
        where: { cartId: cart[0].id },
      })
      let cartProducts = [];

      cartdetails.forEach(async (data) => {
        // console.log(data.productId)
        const product = await Product.findOne({
          where: { id: data.productId }
        })
        cartProducts.push(product.dataValues);
        return console.log(cartProducts)
      })
      return console.log(cartProducts)
      return sendSuccessResponse( res, 200, cartProducts )
    } catch (e) {
      return sendErrorResponse(res, 400, e.message);
    }
  },

  async deleteProductFromCart (req, res) {
    try {
      const destroyableProduct = await CartDetail.findOne({
        where: { 
          id: req.params.cartdetailId,
          productId: req.params.productId,
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
