import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import router from './routes/router';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', router);

app.use((err, rep, res, next) => {
  const { status, message } = err;
  console.error(err);
  res.status(status || 500).json({
    message,
  });
});

export default app;
