import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError} from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import InternalServerError from '../errors/internal-server-error';
import NotFoundError from '../errors/not-found-error';
import { faker } from '@faker-js/faker';
import Product from '../models/product';

export const postOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const { items, total} = req.body;

  const products = await Product.find({ '_id': { $in: items } });

  if (products.length !== items.length) {
      return next(new NotFoundError('Продукты не найдены'));
  }
   const totalSum = products.reduce((sum, product) => {
      if (product.price == null) {
        throw new BadRequestError(`Product ${product._id} не имеет цены`);
      }
      return sum + product.price;
    }, 0);

    if (totalSum !== total) {
      return next(new BadRequestError('Ошибка расчета'));
    }

    const orderId = faker.string.uuid();

    return res.status(201).json({
      id: orderId,
      total: totalSum,
    });

  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(error.message));
    };
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new InternalServerError(error.message));
  };
  if (error instanceof BadRequestError || error instanceof NotFoundError) {
      return next(error);
    }
    return next(new InternalServerError('ошибка сервера'));
}
};
export default postOrder
