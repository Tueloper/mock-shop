import models from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import { isValidInput, magicTrimmer, validate } from './../utils/validator';
import cloudinaryImage from './../utils/Cloudinary';

const { User, Product } = models;

/**
 * UserController.
 * 
 */
const ProductController = {
  async createProduct(req, res, next) {
    try {
     //trime the product object
      const productData = magicTrimmer(req.body);
      const { name, description, category, price, avatar, isStock } = productData;

       // validate inputs
       const schema = {
        name: isValidInput(name),
        category: isValidInput(category),
        description: isValidInput(description),
        price: isValidInput(price)
      };

      const error = validate(schema);
      if (error) return sendErrorResponse(res, 422, error);

      //convert image file to imageUrl
      const imageUrl = await cloudinaryImage(req.file);

      const product = await Product.create({
        name, description, category, price, imageUrl: imageUrl.secure_url, isStock
      })

      return sendSuccessResponse(res, 200, product );
    } catch (e) {
      return next(e);
    }
  }
};

export default ProductController;
