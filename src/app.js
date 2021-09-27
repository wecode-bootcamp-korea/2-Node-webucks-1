import express from 'express';
import morgan from 'morgan';
import { ERRORS } from './constances';
import { commonMiddleWare } from './middleWares/commonMiddleWare';
import router from './routes';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(commonMiddleWare);
app.use(router);
app.use((err, req, res, next) => {
  const { status, message: error } = err;
  console.log(error);
  res.status(status || 500).json({ ok: false, error: ERRORS.SERVER });
});

export default app;
