import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError} from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import InternalServerError from '../errors/internal-server-error';
import NotFoundError from '../errors/not-found-error';
import product from '../models/product';

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await product.find({});
    res.status(200).json(products);
  } catch (error) {
    next(new InternalServerError('Ошибка при получении продуктов'));
  }
};

export const postProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, image, category, description, price } = req.body;
const newProduct = await product.create({
      title,
      image,
      category,
      description,
      price,
    });

     res.status(201).json({ message: 'Продукт успешно добавлен', product: newProduct });
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new InternalServerError(error.message));
    }
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      return next(error);
    }
    return next(new InternalServerError('Ошибка сервера'));
  }
};