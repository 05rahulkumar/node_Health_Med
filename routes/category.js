// routes/banner.routes.js
const express = require('express');
let route= express.Router();
const categoryController = require('../controller/category');
const upload = require('../MulterUpload/upload');

route.post('/shop_by_category', upload.single('image'),categoryController.createCategory);
route.get('/shop_by_category',categoryController.getCategories);
route.delete('/shop_by_category/:_id',categoryController.deleteCategory);
route.put('/shop_by_category/:_id',upload.single('image'),categoryController.updateCategory);
route.get('/shop_by_category/:_id',categoryController.getCategoryById);

module.exports = route;
