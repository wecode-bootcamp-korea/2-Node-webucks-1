import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

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

app.post('/users', async (req, res) => {
  await prisma.$queryRaw`
    INSERT INTO users (email, password, username, address, phone_number)
    VALUES ("yebom1@wecode.com", "yebom1", "이예봄", "짱이야", "010-1111-1111"),
    ("wook1@wecode.com", "wook1", "이욱창", "짱짱이야", "010-2222-2222"),
    ("jeonghoon1@wecode.com", "hoon1", "박정훈", "짱짱짱이야", "010-3333-3333"),
    ("changhyeon1@wecode.com", "hyeon1", "윤창현", "짱짱짱짱이야", "010-4444-4444"),
    ("jeongho1@wecode.com", "ho1", "신정호", "짱짱짱짱짱이야", "010-5555-5555"),
    ("dabin1@wecode.com", "bin1", "안다빈", "짱짱짱짱짱짱이야", "010-6666-6666")
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
