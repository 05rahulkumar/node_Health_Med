const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderSummaryController = require('../controller/orderSummary');

router.post('/orderSummary', auth.isAuth, orderSummaryController.createOrderSummary);
router.get('/orderSummary', auth.isAuth, orderSummaryController.getOrderSummary);
// router.get('/orderSummary/:_id', auth.isAuth, orderSummaryController.g);

module.exports = router;


