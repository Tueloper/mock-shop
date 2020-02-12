import model from '../models';
import {
  validate,
  inValidName,
  inValidEmail,
  inValidPassword,
  magicTrimmer,
  isValidInput
} from '../utils/validator';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';
import { hashPassword, comparePassword } from '../utils/passwordHash';
import { createToken } from '../utils/processToken';


const { User, Token } = model;
// const User = user;


// Returns token for logged in user.
const userToken = (user) => {
  const {
    email, firstName, id, isAdmin
  } = user;
  return {
    token: createToken({
      firstName,
      id,
      email,
      isAdmin
    }),
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
      const userData = magicTrimmer(req.body);

      const {
        firstName, lastName, email, password, isAdmin
      } = userData;

      // validate inputs
      const schema = {
        firstName: isValidInput('FirstName', firstName),
        lastName: isValidInput(lastName),
        email: inValidEmail(email),
        password: inValidPassword(password),
      };

      const error = validate(schema);
      if (error) return sendErrorResponse(res, 422, error);

      const user = await User.findOne({ where: { email } });
      if (user) {
        return sendErrorResponse(
          res,
          409,
          'A User with this Email already exist',
        );
      }

      const encryptedPassword = hashPassword(password);
      await User.create({
        firstName,
        lastName,
        email,
        password: encryptedPassword,
        isAdmin: ( isAdmin === 'true' ? 'true' : 'false'),
      });
 
      return sendSuccessResponse(res, 201, {
        message: 'Account created successfully',
      });
    } catch (e) {
      return next(e);
    }
  },

  async signIn(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      // return console.log(user)
      if (!user) return sendErrorResponse(res, 404, 'User or password incorrect');
      const checkPassword = comparePassword(password, user.dataValues.password);
      if (!checkPassword) {
        return sendErrorResponse(res, 400, 'Details incorrect');
      }

      //authenicating storing the token in the data base  
      const token = userToken(user.dataValues);
      // return console.log(token)
      await Token.create({
        token: token.token,
        user_id: user.id
      })
      return sendSuccessResponse(res, 200, token);
    } catch (e) {
      next(e);
    }
  },

  async me(req, res, next) {
    try {
      const user = req.userData;

      const profile = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [{
          model: Token,
          as: 'tokens'
        }]
      });
      return sendSuccessResponse(res, 200, profile);
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
      })
      // return console.log(token);
      await token.destroy();

      return sendSuccessResponse(res, 200, 'Succefully Logged out')
    } catch (error) {
      return sendErrorResponse(res, 400, error)      
    }
  }
}

export default AuthController;
