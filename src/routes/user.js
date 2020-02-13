import express from 'express';
import UserController from '../controller/CartController';
import Auth from '../middleware/Auth';
import isUser from './../middleware/isUser';

const router = express.Router();

router.post('/cart/create/:productId', [ Auth, isUser ], UserController.AddProductCart );
router.get('/profile/carts', [ Auth, isUser ], UserController.getUserCartProducts );
router.delete('/cart/:cartdetailId/product/:productId', [ Auth, isUser ], UserController.deleteProductFromCart )

export default router;