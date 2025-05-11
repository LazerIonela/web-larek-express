import { Router } from 'express';
import { postOrder } from '../controllers/order';
import { validateOrder } from '../middlewares/validatons';

const router = Router();

router.post('/', validateOrder, postOrder);

export default router;
