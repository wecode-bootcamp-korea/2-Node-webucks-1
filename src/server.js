import dotenv from 'dotenv';
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();
const app = express();
const { PORT } = process.env;

// app.post;
app.get('/categories', async (req, res) => {
  await prisma.$queryRaw`
    INSERT INTO categories (name)
    VALUES ("콜드브루");

  `;
  const [category] = await prisma.$queryRaw`
  SELECT * 
  FROM categories
  ORDER BY id DESC
  LIMIT 1
  `;

  res.json(category);
});

app.get('/products', async (req, res) => {
  await prisma.$queryRaw`
  INSERT INTO products (category_id, korean_name, english_name, description)
  VALUES (1, "시그니처 더 블랙 콜드 브루", "signature The Black Cold Brew", "콜드 브루 전용 원두를 차가운 물로 14시간 동안 추출하여 부드럽고 진한 풍미의 콜드브루를 딜리버리로 원하는 곳에서 편하게 즐겨보세요");
  `;

  const [product] = await prisma.$queryRaw`
  SELECT *
  FROM products
  ORDER BY id DESC
  LIMIT  1`;

  res.json(product);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const [product] = await prisma.$queryRaw`
	  SELECT p.id, p.category_id, p.korean_name, p.english_name, p.description
	  FROM products p
	  WHERE p.id=${id}
`;

  res.json(product);
});

app.post('/users', async (req, res) => {
  await prisma.$queryRaw`
  INSERT INTO users (email, password, username, address, phone_number) VALUES ('fireking5997@gmail.com', '3905', 'WeCode1', '박정훈', '01039050101'),
  ('wjdghtls11@gmail.com', '2756', 'WeCode2', '신정호', '01027563617'),
   ('dabin0219@gmail.com', '7191', 'WeCode3', '안다빈', '01071919766'),
  ('changh950@gmail.com', '2605', 'WeCode4', '윤창현', '01026054161'),
   ('eebzaaa@gmail.com', '4448', 'WeCode5', '이예봄', '01044487484'),
  ('uclee95@gmail.com', '7229', 'WeCode6', '이욱창', '01072298917');
  `;
  const user = await prisma.$queryRaw`
  SELECT *
  FROM users
  ORDER BY id DESC
  LIMIT  6;
  `;

  res.json(user);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => console.log(`server on ${PORT}`));
