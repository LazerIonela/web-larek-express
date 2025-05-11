import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
// import bodyParser from 'body-parser';
import router from './routes/index';
import errorHandler from './middlewares/error-handler';
import {errorLogger, requestLogger} from '../src/middlewares/logger';

const { PORT, DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek'} = process.env;
const app = express();

app.listen(PORT, () => {
  console.log('Server running at 3000');
});

app.use(requestLogger);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);
app.use(errorLogger);
app.use(errorHandler);

mongoose
  .connect(DB_ADDRESS)
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch(() => {
    console.error('Connection error');
  });

export default app