const Product = require('../models/productModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

exports.getAll = asyncErrorHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

exports.getById = asyncErrorHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

exports.create = asyncErrorHandler(async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  if (!name || !description || !price || !imageUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const product = new Product({ name, description, price, imageUrl });
  await product.save();
  res.status(201).json(product);
});

exports.update = asyncErrorHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

exports.remove = asyncErrorHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted successfully' });
});
