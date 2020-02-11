"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../models"));

var _validator = require("../utils/validator");

var _sendResponse = require("../utils/sendResponse");

var _passwordHash = require("../utils/passwordHash");

var _processToken = require("../utils/processToken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  User,
  Token
} = _models.default; // const User = user;
// Returns token for logged in user.

const userToken = user => {
  const {
    email,
    firstName,
    id,
    isAdmin
  } = user;
  return {
    token: (0, _processToken.createToken)({
      firstName,
      id,
      email,
      isAdmin
    })
  };
};
/**
 * UserController.
 * 
 */


const AuthController = {
  async signUp(req, res, next) {
    try {
      // Trims req.body to remove leading and trailing white spaces
      const userData = (0, _validator.magicTrimmer)(req.body);
      const {
        firstName,
        lastName,
        email,
        password,
        isAdmin
      } = userData; // validate inputs

      const schema = {
        firstName: (0, _validator.isValidInput)('FirstName', firstName),
        lastName: (0, _validator.isValidInput)(lastName),
        email: (0, _validator.inValidEmail)(email),
        password: (0, _validator.inValidPassword)(password)
      };
      const error = (0, _validator.validate)(schema);
      if (error) return (0, _sendResponse.sendErrorResponse)(res, 422, error);
      const user = await User.findOne({
        where: {
          email
        }
      });

      if (user) {
        return (0, _sendResponse.sendErrorResponse)(res, 409, 'A User with this Email already exist');
      }

      const encryptedPassword = (0, _passwordHash.hashPassword)(password);
      await User.create({
        firstName,
        lastName,
        email,
        password: encryptedPassword,
        isAdmin: isAdmin === 'admin' ? 'true' : 'false'
      });
      return (0, _sendResponse.sendSuccessResponse)(res, 201, {
        message: 'Account created successfully'
      });
    } catch (e) {
      return next(e);
    }
  },

  async signIn(req, res, next) {
    const {
      email,
      password
    } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email
        }
      }); // return console.log(user)

      if (!user) return (0, _sendResponse.sendErrorResponse)(res, 404, 'User or password incorrect');
      const checkPassword = (0, _passwordHash.comparePassword)(password, user.dataValues.password);

      if (!checkPassword) {
        return (0, _sendResponse.sendErrorResponse)(res, 400, 'Details incorrect');
      } //authenicating storing the token in the data base  


      const token = userToken(user.dataValues); // return console.log(token)

      await Token.create({
        token: token.token,
        user_id: user.id
      });
      return (0, _sendResponse.sendSuccessResponse)(res, 200, token);
    } catch (e) {
      next(e);
    }
  },

  async me(req, res, next) {
    try {
      const user = req.userData;
      const profile = await User.findOne({
        where: {
          id: user.id
        },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Token,
          as: 'tokens'
        }]
      });
      return (0, _sendResponse.sendSuccessResponse)(res, 200, profile);
    } catch (e) {
      return next(e);
    }
  },

  async logout(req, res) {
    try {
      const user = req.userData;
      const loginToken = req.token;
      const token = await Token.findOne({
        where: {
          user_id: user.id,
          token: loginToken
        }
      }); // return console.log(token);

      await token.destroy();
      return (0, _sendResponse.sendSuccessResponse)(res, 200, 'Succefully Logged out');
    } catch (error) {
      return (0, _sendResponse.sendErrorResponse)(res, 400, error);
    }
  }

};
var _default = AuthController;
exports.default = _default;