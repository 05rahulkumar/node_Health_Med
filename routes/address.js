// routes/banner.routes.js
const express = require('express');
let route= express.Router();
const addressController = require('../controller/address');

route.post('/address',addressController.createAddress);
route.get('/address',addressController.getAddress);
route.delete('/address/:_id',addressController.deleteAddress);
route.put('/address/:_id',addressController.updateAddress);
route.get('/address/:_id',addressController.getAddressById);

module.exports = route;
