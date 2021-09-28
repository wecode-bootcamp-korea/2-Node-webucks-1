import { productService } from '../services';

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json({
      message: 'SUCCESS',
      products,
    });
  } catch (err) {
    console.log(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProduct(id);
    res.status(200).json({
      message: 'SUCCESS',
      product,
    });
  } catch (err) {
    console.log(err);
  }
};

const likeProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.decoded.id;
    const isLiked = await productService.likeProduct(productId, userId);
    res.status(200).json({
      message: isLiked ? 'LIKED' : 'DISLIKED',
    });
  } catch (err) {
    console.log(err);
  }
};

const commentProduct = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

const updateCommentProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.decoded.id;
    const { comment } = req.body;
    await productService.updateCommentProduct(productId, userId, comment);
    res.status(200).json({
      message: 'UPDATED',
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteCommentProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.decoded.id;
    await productService.deleteCommentProduct(productId, userId);
    res.status(200).json({
      message: 'DELETED',
    });
  } catch (err) {
    console.log(err);
  }
};

export default {
  getProducts,
  getProduct,
  likeProduct,
  commentProduct,
  updateCommentProduct,
  deleteCommentProduct,
};
