import model from './../models';
import { verifyToken } from './../utils/processToken';
import { sendErrorResponse } from './../utils/sendResponse';

const { User } = model;

export default async ( req, res, next ) => {

  try {
    if (!req.headers.authorization) return sendErrorResponse(res, 401, 'Authentication required');
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    // return console.log(token)
    const { email } = verifyToken(token);
    const user = await User.findOne({ where: { email } });
    if (!user) return sendErrorResponse(res, 401, 'User does not exist');
    req.userData = user.dataValues;
    req.token = token;
    next();
  } catch (err) {
    const error = err.message ? 'Authentication Failed' : err;
    next(error)
  }
}