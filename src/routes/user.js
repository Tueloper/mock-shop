import express from 'express';
import AuthController from './../controller/AuthController';
import Auth from './../middleware/Auth';

const router = express.Router();

router.post('/auth/signup', AuthController.signUp );
router.post('/auth/signin', AuthController.signIn );
router.get('/auth/me', Auth, AuthController.me );
router.delete('/auth/logout', Auth, AuthController.logout );

export default router;