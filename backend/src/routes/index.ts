import { Router } from 'express';
import routerProduct from './product';
import routerOrder from './order';

const router = Router();
router.use('/product', routerProduct);
router.use('/order', routerOrder);

export default router;
