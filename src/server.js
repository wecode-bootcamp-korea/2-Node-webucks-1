import app from './app';
import { getCategory, getCoffeeDatas } from './getData';
import client from './models';
const PORT = process.env.PORT;

const start = async () => {
  try {
    await app.listen(PORT, () => console.log(`server is running on ${PORT}`));
  } catch (e) {
    console.log(e);
    client.$disconnect();
  }
};
start();
