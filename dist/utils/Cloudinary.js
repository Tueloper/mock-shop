"use strict";

var _sharp = _interopRequireDefault(require("sharp"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Datauri = require('datauri');

const dUri = new Datauri();

require('./cloudinary_setup');

const cloudinaryImage = async image => {
  const buffer = await (0, _sharp.default)(image.buffer).resize({
    width: 300,
    height: 300
  }).png().toBuffer();
  const dataUri = dUri.format(_path.default.extname(image.originalname).toString(), buffer);
  const imageFile = dataUri.content;
  const imageUrl = await _cloudinary.default.v2.uploader.upload(imageFile); // return console.log(imageUrl)

  return imageUrl;
};

async function destroyCloudinaryImage(id) {
  await _cloudinary.default.v2.uploader.destroy(id, (err, result) => {
    if (err) console.log(err);else console.log(result);
  });
}

module.exports = {
  cloudinaryImage,
  destroyCloudinaryImage
};