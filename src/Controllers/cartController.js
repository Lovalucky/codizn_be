const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');


exports.getCart = asyncErrorHandler(async (req, res) => {
  const userId = req.user?.id || 'guest'; 

  const cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  res.json(cart.items);
});


exports.addToCart = asyncErrorHandler(async (req, res) => {
  const userId = req.user?.id || 'guest'; 
  const { product: productId, quantity = 1 } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  await cart.populate('items.product');

  res.json(cart.items);
});


exports.removeFromCart = asyncErrorHandler(async (req, res) => {
  const userId = req.user?.id || 'guest';
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const itemId = req.params.id;
  cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
  await cart.save();

  res.json({ message: 'Item removed from cart' });
});


exports.clearCart = asyncErrorHandler(async (req, res) => {
  const userId = req.user?.id || 'guest';
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = [];
  await cart.save();

  res.json({ message: 'Cart cleared' });
});
