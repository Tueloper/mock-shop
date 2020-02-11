"use strict";

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)({
  limits: {
    fileSize: 10000000
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg|PNG)$/)) {
      return cb(new ErrorEvent('PLease upload a Picture format'));
    }

    cb(undefined, true);
  }

});
module.exports = upload;