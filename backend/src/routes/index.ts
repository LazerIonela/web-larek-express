import { Router } from 'express';
import routerProduct from './product';
import routerOrder from './order';
// import { validateProduct, validateOrder } from '../middlewares/validatons';

const router = Router();
router.use('/product', routerProduct);
router.use('/order', routerOrder);

export default router;
