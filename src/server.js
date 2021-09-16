import dotenv from 'dotenv';
import express from 'express';
import productRouter from './routes/productRouter';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRouter);

app.use(function (err, req, res, next) {
  return res.status(500).json({
    ok: false,
    error: '알수없는 오류가 발생했습니다 관리자에게 문의하세요.',
  });
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
