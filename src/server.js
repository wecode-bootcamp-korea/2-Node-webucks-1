import dotenv from 'dotenv';
import app from '../src/app';

dotenv.config();

const { PORT } = process.env;

app.listen(PORT, () => console.log(`server on ${PORT}`));
