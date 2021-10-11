import { productService } from '../services';

const getProducts = async (req, res) => {
  const products = await productService.getProducts();
  res.json(products);
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await productService.getProduct(id);
  res.json(product);
};

const insertComment = async (req, res) => {
  const { decodedUser } = req;
  const commentInsertData = {
    userId: decodedUser.id,
    productId: req.params.id,
    content: req.body.content,
  };
  const comment = productService.insertComment(commentInsertData);
  res.json(comment);
};

export default { getProducts, getProduct, insertComment };
