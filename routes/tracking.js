const express = require('express');
const router = express.Router();
const trackingController = require('../controller/tracking');

// POST /api/tracking - Create tracking status
router.post('/tracking', trackingController.createTracking);

// GET /api/tracking/:trackingId - Get tracking details by tracking ID
router.get('/tracking/:trackingId', trackingController.getTrackingById);

module.exports = router;
