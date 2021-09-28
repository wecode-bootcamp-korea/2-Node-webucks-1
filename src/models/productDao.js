import prisma from '../../prisma';

const getProducts = async () => {
  const products = await prisma.$queryRaw`
  SELECT 
    p.id, 
    p.korean_name, 
    p.english_name, 
    c.name, 
    c.id, 
    i.image_url
  FROM products p
  JOIN categories c
  ON c.id = p.category_id
  JOIN images i
  ON i.product_id = p.id
  `;
  return products;
};

const getProduct = async productId => {
  const [product] = await prisma.$queryRaw`
  SELECT 
    p.id, 
    p.korean_name, 
    p.english_name, 
    i.image_url
  FROM products p
  JOIN images i
  ON i.product_id = p.id
  WHERE p.id=${productId}
  `;
  return product;
};

const likeProduct = async (productId, userId) => {
  const [isLiked] = await prisma.$queryRaw`
    select * from likes where product_id=${productId} and user_id=${userId}
    `;
  if (isLiked) {
    await prisma.$queryRaw`delete from likes where product_id=${productId} and user_id=${userId}`;
    return false;
  } else {
    await prisma.$queryRaw`
      INSERT INTO likes (product_id, user_id) VALUE (${productId}, ${userId})
    `;
    return true;
  }
};

const commentProduct = async (productId, userId, comment) => {
  await prisma.$queryRaw`
    INSERT INTO comments (contents, product_id, user_id) VALUE (${comment},${productId}, ${userId})
  `;
  const [createdComment] = await prisma.$queryRaw`
  SELECT id, contents, user_id, product_id
  FROM comments
  ORDER BY comments.id DESC LIMIT 1;
  `;
  return createdComment;
};

const updateCommentProduct = async (productId, userId, comment) => {
  return await prisma.$queryRaw`
  UPDATE comments 
  SET 
    contents=${comment}, 
    updated_at=now()
  WHERE 
    product_id=${productId} 
  AND 
    user_id=${userId};
  `;
};

const deleteCommentProduct = async (productId, userId) => {
  return await prisma.$queryRaw`
    UPDATE comments 
    SET 
      deleted_at=now(), 
      is_deleted=true 
    WHERE 
      product_id=${productId} 
    AND 
      user_id=${userId}
  ;`;
};

export default {
  getProducts,
  getProduct,
  likeProduct,
  commentProduct,
  updateCommentProduct,
  deleteCommentProduct,
};
