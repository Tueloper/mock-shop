import express from 'express';
import AuthController from './../controller/AuthController';

const router = express.Router();

router.post('/auth/signup', AuthController.signUp );
router.post('/auth/signin', AuthController.signIn );
router.get('/auth/me', AuthController.me );

export default router;