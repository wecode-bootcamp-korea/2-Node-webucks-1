import dotenv from 'dotenv';
import express from 'express';
import prisma from '../prisma';
import router from './routes';

dotenv.config();
const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.get('/categories', async (req, res) => {
  const allCategories = await prisma.$queryRaw`
    SELECT c.id, c.name FROM categories c
  `;

  res.json(allCategories);
});

app.post('/categories', async (req, res) => {
  await prisma.$queryRaw`
    INSERT INTO categories (name)
    VALUES ("라떼");
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
  const allProducts = await prisma.$queryRaw`
    SELECT p.id, p.korean_name, p.english_name, c.name, c.id, i.image_url
    FROM products p
    JOIN categories c
    ON p.category_id = c.id
    JOIN images i
    ON i.product_id = p.id
  `;

  res.json(allProducts);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const [selectedProduct] = await prisma.$queryRaw`
    SELECT p.id, p.korean_name, p.english_name, i.image_url
    FROM products p
    JOIN images i
    ON i.product_id = p.id
    WHERE p.id=${id}
  `;

  res.json(selectedProduct);
});

app.listen(PORT, () => console.log(`server on ${PORT}`));
