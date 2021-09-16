import dotenv from 'dotenv';
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();
const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/categories', async (req, res) => {
  const category = await prisma.$queryRaw`
    SELECT c.id, c.name
    FROM categories as c;
  `;

  res.json(category);
});

app.post('/categories/new-categories', async (req, res) => {
  await prisma.$queryRaw`
    INSERT INTO categories (name)
    VALUES ("클램차우더");
  `;

  const [category] = await prisma.$queryRaw`
    SELECT c.id , c.name
    FROM categories as c
    ORDER BY id DESC
    LIMIT 1;
  `;

  res.json(category);
});

app.get('/products', async (req, res) => {
  const product = await prisma.$queryRaw`
  SELECT p.id, p.korean_name, p.english_name, p.category_id
  FROM products as p;
  `;

  res.json(product);
});

app.get('/products/:id', async (req, res) => {
  let id = req.params.id;

  const product = await prisma.$queryRaw`
  SELECT p.id, p.korean_name, p.english_name, p.category_id
  FROM products as p
  where p.id=${id};
  `;

  res.json(product);
});

app.post('/user/new-user', async (req, res) => {
  await prisma.$queryRaw`
  INSERT INTO users (email,password,username,address,phone_number,policy_agreed)
  VALUES ("uclee95@wecode.conmm","0905","wook","gwangmeyong","01072298999","1"),
  ("eebzaaa@wecode.conmm","0905","yebom","busan","0101238999","1"),  
  ("fireking5997@wecode.conmm","0905","park","종로타워지킴이","01039050101","1"),
  ("dabin0219@wecode.conmm","0905","dabin","구파발헬창","01071799766","1"),
  ("changh950@wecode.cnomm","0905","chang","선릉2호점지킴이","01026054161","1"),
  ("wjdghtls11@wecode.cnomm","0905","ho","양천구교육열의도시","01027563617","1");  
  `;

  const user = await prisma.$queryRaw`
  SELECT *
  FROM users
  ORDER BY id DESC
  LIMIT 6;
  `;

  res.json(user);
});

app.listen(PORT, () => console.log(`server on ${PORT}`));
