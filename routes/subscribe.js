const express = require('express');
const router = express.Router();
const subscriptionController = require('../controller/subscriber');

// POST API to subscribe an email
router.post('/subscriber', subscriptionController.subscribe);
// GET API to get all subscriptions
router.get('/subscriber', subscriptionController.getSubscriptions);
router.delete('/subscriber/:id', subscriptionController.getSubscriptions);

module.exports = router;
