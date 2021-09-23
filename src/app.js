import express from 'express';
import morgan from 'morgan';
import router from './routes';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
  const { status, message: error } = err;
  console.log(err);
  res
    .status(status || 500)
    .json({ error: '알수없는 오류가 발생 했습니다. 관리자에게 문의 하세요.' });
});

export default app;
