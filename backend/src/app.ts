import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import router from './routes/index';
import errorHandler from './middlewares/error-handler';
import { errorLogger, requestLogger } from './middlewares/logger';

dotenv.config();
const {
  PORT = 3000,
  DB_ADDRESS = 'mongodb://localhost:27017/weblarek',
} = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

mongoose
  .connect(DB_ADDRESS)
  .then(() => {
    app.listen(PORT, () => {
      // console.log(`MongoDB connected successfully at ${PORT}!`);
    });
  })
  .catch(() => {
    // console.error('Connection error');
  });

export default app;
