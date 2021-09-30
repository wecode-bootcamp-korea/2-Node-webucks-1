import { productService } from '../services';
import { wrapAsync } from '../utils';

const getProducts = wrapAsync(async (req, res) => {
  const categoryId = req.query.categoryId;
  const products = await productService.getProducts(Number(categoryId));
  res.status(200).json({
    message: 'SUCCESS',
    products,
  });
});

const getProduct = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProduct(id);
  res.status(200).json({
    message: 'SUCCESS',
    product,
  });
});

const likeProduct = wrapAsync(async (req, res) => {
  const productId = req.params.id;
  const userId = req.decoded.id;
  const isLiked = await productService.likeProduct(productId, userId);
  res.status(200).json({
    message: isLiked ? 'LIKED' : 'DISLIKED',
  });
});

const commentProduct = wrapAsync(async (req, res) => {
  const productId = req.params.id;
  const userId = req.decoded.id;
  const { comment } = req.body;
  const createdComment = await productService.commentProduct(
    productId,
    userId,
    comment
  );
  res.status(201).json({
    message: 'CREATED',
    createdComment,
  });
});

const updateCommentProduct = wrapAsync(async (req, res) => {
  const productId = req.params.id;
  const userId = req.decoded.id;
  const { comment } = req.body;
  await productService.updateCommentProduct(productId, userId, comment);
  res.status(200).json({
    message: 'UPDATED',
  });
});

const deleteCommentProduct = wrapAsync(async (req, res) => {
  const productId = req.params.id;
  const userId = req.decoded.id;
  await productService.deleteCommentProduct(productId, userId);
  res.status(200).json({
    message: 'DELETED',
  });
});

export default {
  getProducts,
  getProduct,
  likeProduct,
  commentProduct,
  updateCommentProduct,
  deleteCommentProduct,
};
