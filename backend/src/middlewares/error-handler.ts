import { Request, Response, NextFunction } from 'express';
import { CelebrateError, isCelebrateError } from 'celebrate';

function formatCelebrateError(err: CelebrateError) {
  console.log('CelebrateError', CelebrateError);
  const details = Array.from(err?.details?.values());


  return `${err.message}: ${details.map(e => e.message).join(', ')}`;
}

const errorHandler = (err: any| CelebrateError, req: Request, res: Response, next: NextFunction) => {
  let statusCode: number;
  let message: string;

  if (isCelebrateError(err)) {
    statusCode = 400;
    message = formatCelebrateError(err);
  } else {
    console.log('err', err )
    statusCode = err?.statusCode || 500;
    message = err.message ||  'Internal Server Error';
  }

  return res.status(statusCode).send({ message, statusCode });
}

export default errorHandler;