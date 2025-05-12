import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import { faker } from '@faker-js/faker';
import BadRequestError from '../errors/bad-request-error';
import InternalServerError from '../errors/internal-server-error';
import ConflictError from '../errors/conflict-error';
import Product from '../models/product';

export const postOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { items, total } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return next(new BadRequestError('Поле items обязательно и должно содержать хотя бы один товар'));
    }

    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      return next(new BadRequestError('Продукты не найдены'));
    }

    const productWithoutPrice = products.find((product) => product.price == null);
    if (productWithoutPrice) {
      return next(new BadRequestError(`Продукт с ID ${productWithoutPrice._id} не имеет цены`));
    }

    const totalSum = products.reduce((sum, product) => sum + product.price!, 0);
    if (totalSum !== total) {
      return next(new BadRequestError('Сумма заказа не совпадает с суммой выбранных товаров'));
    }
    const orderId = faker.string.uuid();

    return res.status(200).json({
      id: orderId,
      total: totalSum,
    });
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    if ((error as any)?.code === 11000 || (error instanceof Error && error.message.includes('E11000'))) {
      return next(new ConflictError('Продукт уже существует'));
    }
    return next(new InternalServerError('ошибка сервера'));
  }
};

export default postOrder;
