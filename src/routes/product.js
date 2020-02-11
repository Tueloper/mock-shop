import express from 'express';
import ProductController from './../controller/ProductController';
import Auth from './../middleware/Auth';
import isAdmin from './../middleware/isAdmin';
import upload from './../utils/upload'

const router = express.Router();

router.post('/product/create', [  upload.single('avatar'), Auth, isAdmin ], ProductController.createProduct );
router.patch('/product/update', [ Auth, isAdmin ], ProductController.updateProduct );
router.delete('/product/delete', [ Auth, isAdmin ], ProductController.deleteProduct );
export default router;