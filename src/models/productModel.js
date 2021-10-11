import prisma from './client';

const getProducts = async () => {
  const products = await prisma.$queryRaw`
    SELECT
      p.id,
      p.korean_name,
      p.english_name,
      p.category_id
    FROM products as p;
  `;
  return products;
};

const getProduct = async productId => {
  const id = productId;

  const [product] = await prisma.$queryRaw`
    SELECT
      p.id,
      p.korean_name,
      p.english_name,
      p.category_id
    FROM products as p
    where p.id=${id};
  `;
  return product;
};

const insertComment = async commentInsertData => {
  const { userId, productId, content } = commentInsertData;
  await prisma.$queryRaw`
    INSERT into comments(
      user_id,
      product_id,
      content
      ) values (
        ${userId},
        ${productId},
        ${content}
      );
  `;

  const comment = await prisma.$queryRaw`
    SELECT
      id,
      user_id,
      product_id,
      created_at,
      updated_at, content
    FROM comments
    ORDER BY id DESC
    LIMIT 1;
  `;

  return comment;
};

export default { getProducts, getProduct, insertComment };
