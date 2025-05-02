import { Request } from 'express';

const orders: string[] = [];

export const postOrder = (req: Request) => {
  const { order } = req.body;
  orders.push(order);
};

export default postOrder;
