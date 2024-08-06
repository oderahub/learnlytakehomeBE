import { Router } from 'express';
import * as productController from '../controllers/productController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/', productController.getProducts);
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

export default router;
