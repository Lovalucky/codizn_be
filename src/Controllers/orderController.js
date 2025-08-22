const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

exports.checkout = asyncErrorHandler(async (req, res) => {
  const { items, name, email, address } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Items are required" });
  }

  let total = 0;
  for (const i of items) {
    const product = await Product.findById(i.product);
    if (!product) {
      return res.status(404).json({ message: `Product not found: ${i.product}` });
    }
    total += product.price * i.quantity;
  }

  const order = await Order.create({ items, name, email, address, total });
  res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
});

exports.getAll = asyncErrorHandler(async (req, res) => {
  const orders = await Order.find().populate("items.product");
  res.json(orders);
});

exports.getById = asyncErrorHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("items.product");
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});
