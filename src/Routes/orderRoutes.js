const express = require('express');
const orderController = require('../Controllers/orderController');
const router = express.Router();

router.post('/orders/checkout', orderController.checkout);
router.get('/orders', orderController.getAll);
router.get('/orders/:id', orderController.getById);

module.exports = router;
