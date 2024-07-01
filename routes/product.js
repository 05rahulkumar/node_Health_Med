// routes/banner.routes.js
const express = require('express');
let route= express.Router();
const productController = require('../controller/product');
const upload = require('../MulterUpload/upload');

route.post('/product', upload.single('image'),productController.createProduct);
route.get('/product',productController.getProduct);
route.delete('/product/:_id',productController.deleteProduct);
route.put('/product/:_id',upload.single('image'),productController.updateProduct);
route.get('/product/:_id',productController.getProductById);

module.exports = route;
