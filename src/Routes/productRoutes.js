const express = require('express');
const productController = require('../Controllers/productController');

const router = express.Router();

router.route('/products')
  .get(productController.getAll)
  .post(productController.create);

router.route('products/:id')
  .get(productController.getById)
  .put(productController.update)
  .delete(productController.remove);

module.exports = router;
