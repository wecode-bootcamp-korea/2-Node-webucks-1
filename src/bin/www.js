import dotenv from 'dotenv';
dotenv.config();
import app from '../app';
const { PORT } = process.env;

app.listen(PORT, () => console.log(`server on ${PORT}`));
