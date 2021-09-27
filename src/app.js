import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
const app = express();

dotenv.config();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use((err, req, res, next) => {
  const { status, message } = err;
  console.error(err);
  res.status(status || 500).json({ message });
});

export default app;
