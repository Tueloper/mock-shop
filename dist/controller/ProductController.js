"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("./../models"));

var _sendResponse = require("./../utils/sendResponse");

var _validator = require("./../utils/validator");

var _Cloudinary = require("./../utils/Cloudinary");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Product
} = _models.default;
/**
 * Product Controller.
 * 
 */

const ProductController = {
  /**
   * 
   * @param {req.body} req 
   * @param {object} res 
   * 
   */
  async createProduct(req, res) {
    try {
      //trime the product object
      const productData = (0, _validator.magicTrimmer)(req.body);
      const {
        name,
        description,
        category,
        price,
        isStock
      } = productData; // validate inputs

      const schema = {
        name: (0, _validator.isValidInput)(name),
        category: (0, _validator.isValidInput)(category),
        description: (0, _validator.isValidInput)(description),
        price: (0, _validator.isValidInput)(price)
      };
      const error = (0, _validator.validate)(schema);
      if (error) return (0, _sendResponse.sendErrorResponse)(res, 422, error); //convert image file to imageUrl

      const imageUrl = await (0, _Cloudinary.cloudinaryImage)(req.file);
      const product = await Product.create({
        name,
        description,
        category,
        price,
        imageUrl: imageUrl.secure_url,
        image_publicId: imageUrl.public_id,
        isStock
      });
      return (0, _sendResponse.sendSuccessResponse)(res, 200, product);
    } catch (e) {
      return (0, _sendResponse.sendErrorResponse)(res, 400, e);
    }
  },

  async getAllProducts(req, res) {
    try {
      let products = await Product.findAll({});
      return (0, _sendResponse.sendSuccessResponse)(res, 200, products);
    } catch (e) {
      return (0, _sendResponse.sendErrorResponse)(res, 400, e);
    }
  },

  async updateProduct(req, res) {
    try {
      const isUpdateProduct = await Product.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!isUpdateProduct) return (0, _sendResponse.sendErrorResponse)(res, 400, 'Product Not Found'); //extract the update files

      const {
        name,
        description,
        price,
        category,
        isStock
      } = (0, _validator.magicTrimmer)(req.body);

      if (req.file) {
        await (0, _Cloudinary.destroyCloudinaryImage)(isUpdateProduct.image_publicId);
        const imageUrl = await (0, _Cloudinary.cloudinaryImage)(req.file);
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
      });
      return (0, _sendResponse.sendSuccessResponse)(res, 200, updatedProduct);
    } catch (error) {}
  },

  async deleteProduct(req, res) {
    try {
      const destroyableProduct = await Product.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!destroyableProduct) return (0, _sendResponse.sendErrorResponse)(res, 400, 'Product does not exist');else await destroyableProduct.destroy();
      return (0, _sendResponse.sendSuccessResponse)(res, 200, {
        message: 'Product deleted Succeffully'
      });
    } catch (error) {
      return next(e);
    }
  }

};
var _default = ProductController;
exports.default = _default;