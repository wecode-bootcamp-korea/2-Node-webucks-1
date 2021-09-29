import express from 'express';
import morgan from 'morgan';
import { ERRORS } from './constants';
import { commonAuthMiddleWare } from './middleWares/authMiddleWare';
import { preventSqlInjectionMiddleWare } from './middleWares/commonMiddleWare';
import router from './routes';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(commonAuthMiddleWare);
app.use(preventSqlInjectionMiddleWare);
app.use(router);
app.use((e, req, res, next) => {
  const { status = 500, message = ERRORS.SERVER } = e;
  console.log(e.message);
  res.status(status).json({ message });
});

export default app;
