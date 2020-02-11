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
          userId: user.id,
          productId: product.id
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
        //   as: 'products'
        // }]
      });

      return sendSuccessResponse( res, 200, carts )
    } catch (e) {
      return sendErrorResponse(res, 400, e);
    }
  },

  // async updateProduct(req, res){
  //   try {
  //     const isUpdateProduct = await Product.findOne({
  //       where: {id: req.params.id}
  //     });

  //     if(!isUpdateProduct) return sendErrorResponse(res, 400, 'Product Not Found');

  //     //extract the update files
  //     const { name, description, price, category, isStock} = magicTrimmer(req.body);

  //     if( req.file ) {
  //       await destroyCloudinaryImage( isUpdateProduct.image_publicId );
  //       const imageUrl = await cloudinaryImage(req.file)
  //       return imageUrl;
  //     }
      
  //     const updatedProduct = await isUpdateProduct.update({
  //       name: name || isUpdateProduct.name,
  //       description: description || isUpdateProduct.description,
  //       price: price || isUpdateProduct.price,
  //       category: category || isUpdateProduct.category,
  //       imageUrl: imageUrl.secure_url || isUpdateProduct.imageUrl,
  //       image_publicId: imageUrl.public_id || isUpdateProduct.image_publicId,
  //       isStock: isStock || isUpdateProduct.isStock
  //     })

  //     return sendSuccessResponse(res, 200, updatedProduct )
  //   } catch (error) {
      
  //   }

  // },

  // async deleteProduct(req, res) {
  //   try {
  //     const destroyableProduct = await Product.findOne({
  //       where: { id: req.params.id }
  //     })

  //     if(!destroyableProduct) return sendErrorResponse(res, 400, 'Product does not exist')
  //     else await destroyableProduct.destroy();

  //     return sendSuccessResponse(res, 200, {
  //       message: 'Product deleted Succeffully'
  //     })
  //   } catch (error) {
  //     return next(e)
  //   }
  // }
};

export default CartController;
