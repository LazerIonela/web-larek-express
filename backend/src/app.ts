import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './routes/index';

const { PORT = 3000 } = process.env;
const app = express();
app.listen(PORT, () => {
  console.log('Server running at 3000');
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'punbic')));
app.use(routes);
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/weblarek');
