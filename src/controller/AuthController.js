import model from '../models';
import {
  validate,
  inValidName,
  inValidEmail,
  inValidPassword,
  magicTrimmer,
} from '../utils/validator';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';
import { hashPassword, comparePassword } from '../utils/passwordHash';
import { createToken } from '../utils/processToken';

const { user } = model;
const User = user;


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
      console.log(req.body)
      // Trims req.body to remove leading and trailing white spaces
      const userData = magicTrimmer(req.body);
      const {
        firstName, lastName, email, password, isAdmin
      } = userData;
      // validate inputs
      const schema = {
        firstName: inValidName('First Name', firstName),
        lastName: isValidName('Last Name', lastName),
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
        role: (role === 'admin' ? 'true' : 'false'),
      });
      return sendSuccessResponse(res, 201, {
        message: 'Account created successfully',
        data: userToken()
      });
    } catch (e) {
      return next(e);
    }
  },

  async signIn(req, res, next) {
    const { email, username, password } = req.body;
    try {
      const user = email
        ? await User.findOne({ where: { email } })
        : await User.findOne({ where: { username } });
      if (!user) return sendErrorResponse(res, 404, 'User or password incorrect');
      const checkPassword = comparePassword(password, user.dataValues.password);
      if (!checkPassword) {
        return sendErrorResponse(res, 400, 'Details incorrect');
      }
      return sendSuccessResponse(res, 200, userInfo(user.dataValues));
    } catch (e) {
      next(e);
    }
  },

  async me(req, res, next) {
    try {
      const user = req.userData;

      const profile = await User.findOne({
        where: { uuid: user.uuid },
        attributes: {
          exclude: ['password'],
        }
      });
      return sendSuccessResponse(res, 200, profile);
    } catch (e) {
      return next(e);
    }
  }
};

export default AuthController;
