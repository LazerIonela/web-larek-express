import { Request, Response } from 'express';

const products: string[] = [];
export const getProduct = (res: Response) => {
  res.json(products);
};

export const postProduct = (req: Request) => {
  const { product } = req.body;
  products.push(product);
};
