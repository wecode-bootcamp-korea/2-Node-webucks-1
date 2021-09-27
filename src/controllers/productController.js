import { productService } from '../services';

const getProduct = async (req, res) => {
  const product = await productService.getProduct();

  res.json(product);
};

const getProductOne = async (req, res) => {
  const id = req.params.id;

  const product = await productService.getProductOne(id);

  res.json(product);
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

export default { getProduct, getProductOne, likeProduct };
