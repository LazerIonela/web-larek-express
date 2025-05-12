import { Router } from 'express';
import { getProduct, postProduct } from '../controllers/products';
import { validateProduct } from '../middlewares/validatons';

const router = Router();

router.get('/', getProduct);
router.post('/', validateProduct, postProduct);

export default router;
