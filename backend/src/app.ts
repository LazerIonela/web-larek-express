import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
// import bodyParser from 'body-parser';
import router from './routes/index';
import errorHandler from './middlewares/error-handler';
import {errorLogger, requestLogger} from '../src/middlewares/logger';
import dotenv from 'dotenv';
import {errors} from 'celebrate';

dotenv.config();
const {PORT, DB_ADDRESS} = process.env;
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
  .connect(DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek')
  .then(() => {
    console.log('MongoDB connected successfully!');
    app.listen(PORT, () => {
  console.log('Server running at',PORT);
});
  })
  .catch(() => {
    console.error('Connection error');
  });

export default app