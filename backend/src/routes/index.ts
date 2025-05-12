import { Router } from 'express';
import routerProduct from './product';
import routerOrder from './order';
import NotFoundError from '../errors/not-found-error';

const router = Router();
router.use('/product', routerProduct);
router.use('/order', routerOrder);
router.use('*', (_req, _res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

export default router;
