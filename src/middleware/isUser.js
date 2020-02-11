import { sendErrorResponse } from './../utils/sendResponse';

export default ( req, res, next ) => {
  const {  isAdmin } = req.userData;
  
  //check if user is an admin or not
  if(isAdmin) return sendErrorResponse(res, 400, 'You are Not Authorized');
  else next();
}