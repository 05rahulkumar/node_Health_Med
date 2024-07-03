const express = require('express');
const router = express.Router();
const orderReturnController = require('../controller/orderReturn');
const auth = require('../middleware/auth'); 

router.post('/order/cancel',auth.isAuth, orderReturnController.cancelOrder);
router.post('/order/return',auth.isAuth, orderReturnController.returnOrder);
router.get('/orders/cancel',auth.isAuth, orderReturnController.getCancelledOrders);
router.get('/order/return',auth.isAuth, orderReturnController.getReturnedOrders);

module.exports = router;
