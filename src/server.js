import dotenv from 'dotenv';
import express from 'express';
import prisma from '../prisma/index';
import router from '../src/routes/index';

dotenv.config();
const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => console.log(`server on ${PORT}`));
