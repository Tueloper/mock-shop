import models from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import { isValidInput, magicTrimmer, validate } from './../utils/validator';
import { cloudinaryImage, destroyCloudinaryImage } from './../utils/Cloudinary';

const { User, Product, Cart } = models;

/**
 * UserController.
 * 
 */
const ProductController = {
  async createProduct(req, res, next) {
    try {
     //trime the product object
      const productData = magicTrimmer(req.body);
      const { name, description, category, price, isStock } = productData;

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
        name, 
        description, 
        category, 
        price, 
        imageUrl: imageUrl.secure_url,
        image_publicId: imageUrl.public_id,
        isStock
      })

      return sendSuccessResponse(res, 200, product );
    } catch (e) {
      return next(e);
    }
  },

  async updateProduct(req, res){
    try {
      const isUpdateProduct = await Product.findOne({
        where: {id: req.params.id}
      });

      if(!isUpdateProduct) return sendErrorResponse(res, 400, 'Product Not Found');

      //extract the update files
      const { name, description, price, category, isStock} = magicTrimmer(req.body);

      if( req.file ) {
        await destroyCloudinaryImage( isUpdateProduct.image_publicId );
        const imageUrl = await cloudinaryImage(req.file)
        return imageUrl;
      }
      
      const updatedProduct = await isUpdateProduct.update({
        name: name || isUpdateProduct.name,
        description: description || isUpdateProduct.description,
        price: price || isUpdateProduct.price,
        category: category || isUpdateProduct.category,
        imageUrl: imageUrl.secure_url || isUpdateProduct.imageUrl,
        image_publicId: imageUrl.public_id || isUpdateProduct.image_publicId,
        isStock: isStock || isUpdateProduct.isStock
      })

      return sendSuccessResponse(res, 200, updatedProduct )
    } catch (error) {
      
    }

  },

  async deleteProduct(req, res) {
    try {
      const destroyableProduct = await Product.findOne({
        where: { id: req.params.id }
      })

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

export default ProductController;
