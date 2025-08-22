const express = require('express');
const cartController = require('../Controllers/cartController');
const router = express.Router();

router.get('/cart', cartController.getCart);
router.post('/cart', cartController.addToCart);
router.delete('/cart/:id', cartController.removeFromCart);
router.delete('/cart', cartController.clearCart); // clear all cart

module.exports = router;
