const express = require('express');
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');
const orderRoutes = require('./orderRoutes');
const router = express.Router();

router.use('/api/v1', productRoutes);
router.use('/api/v1', cartRoutes);
router.use('/api/v1', orderRoutes);
module.exports = router;
