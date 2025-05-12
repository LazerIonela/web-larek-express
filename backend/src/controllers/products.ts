import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import InternalServerError from '../errors/internal-server-error';
import ConflictError from '../errors/conflict-error';
import product from '../models/product';

export const getProduct = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await product.find({});
    res.status(200).json({
      items: products,
      total: products.length,
    });
  } catch (error) {
    next(new InternalServerError('Ошибка при получении продуктов'));
  }
};

export const postProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title, image, category, description, price,
    } = req.body;
    const newProduct = await product.create({
      title,
      image,
      category,
      description,
      price,
    });

    return res.status(201).json({ _id: newProduct });
  } catch (error: any) {
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    if (error.code === 11000 || (error instanceof Error && error.message.includes('E11000'))) {
      return next(new ConflictError('Продукт уже существует'));
    }
    return next(new InternalServerError('Ошибка сервера'));
  }
};
