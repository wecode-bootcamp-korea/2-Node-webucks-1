import dotenv from 'dotenv';
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();
const app = express();
const { PORT } = process.env;
app.use(express.json());

app.get('/drinks', async (req, res) => {
  const allDrinks = await prisma.$queryRaw`
  SELECT d.id, d.category_id, d.korean_name, d.english_name
  From drinks d`;

  res.json(allDrinks);
});

app.get('/categories', async (req, res) => {
  const allCategories = await prisma.$queryRaw`
  SELECT c.id, c.name
  From categories c`;

  res.json(allCategories);
});

app.get('/drinks/:id', async (req, res) => {
  const { id } = req.params;
  const [drink] = await prisma.$queryRaw`
  SELECT d.id, d.category_id, d.korean_name, d.english_name
  FROM drinks d
  WHERE d.id=${id}`;

  res.json(drink);
});

app.post('/users', async (req, res) => {
  await prisma.$queryRaw`
    INSERT INTO users (email, password, username, address, phone_number)
    VALUES ('fireking5997@gmail.com', 'a', '박정훈', '내 마음속 1번지', '010-3905-0101'),('wjdghtls11@gmail.com', 'b', '신정호', '내 마음속 2번지', '010-2756-3617'),('dabin0219@gmail.com', 'c', '안다빈', '내 마음속 3번지', '010-7191-9766'),
    ('changh950@gmail.com', 'd', '윤창현', '내 마음속 4번지', '010-2605-4161'),('uclee95@gmail.com', 'e', '이욱창', '내 마음속 5번지', '010-7229-8917');
  `;

  const user = await prisma.$queryRaw`
    SELECT *
    FROM users
    ORDER BY id DESC
    LIMIT 5
`;

  res.json(user);
});

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => console.log(`server on ${PORT}`));
