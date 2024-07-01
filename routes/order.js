const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Assuming you have authentication middleware
const orderController = require('../controller/order');

// POST /api/orders - Create a new order
router.post('/order', auth.isAuth, orderController.createOrder);
// GET /api/orders - Get orders for the authenticated user
router.get('/order', auth.isAuth, orderController.getOrder);

module.exports = router;
