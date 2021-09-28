import { productService } from '../services';

const getProduct = async (req, res) => {
  const product = await productService.getProduct();
  res.status(200).json({
    message: 'SUCCESS',
    data: product,
  });
};

const getProductOne = async (req, res) => {
  const id = req.params.id;
  const product = await productService.getProductOne(id);
  res.status(200).json({
    message: 'SUCCESS',
    data: product,
  });
};

const likeProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.decoded.id;

  try {
    const isLiked = await productService.likeProduct(productId, userId);
    res.status(201).json({
      message: isLiked ? 'LIKED' : 'DISLIKED',
    });
  } catch (err) {
    console.log(err);
  }
};

const commentProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.decoded.id;
  const { comment } = req.body;
  try {
    const status = await productService.commentProduct(
      productId,
      userId,
      comment
    );
    res.status(201).json({
      message: 'COMMENT_UPLOADED',
      comment: status,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateCommentProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.decoded.id;
  const { comment } = req.body;
  try {
    await productService.updateCommentProduct(productId, userId, comment);
    res.status(201).json({
      message: 'UPDATED',
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteCommentProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.decoded.id;

  try {
    await productService.deleteCommentProduct(productId, userId);
    res.status(201).json({
      message: 'DELETED',
    });
  } catch (err) {
    console.log(err);
  }
};

export default {
  getProduct,
  getProductOne,
  likeProduct,
  commentProduct,
  updateCommentProduct,
  deleteCommentProduct,
};
