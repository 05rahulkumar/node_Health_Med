// routes/banner.routes.js
const express = require('express');
let route= express.Router();
const labTestController = require('../controller/labTest');
const upload = require('../MulterUpload/upload');

route.post('/lab_test', upload.single('image'),labTestController.createNewLabTest);
route.get('/lab_test',labTestController.getNewLabTest);
route.delete('/lab_test/:_id',labTestController.deleteNewLabTest);
route.put('/lab_test/:_id',upload.single('image'),labTestController.updateNewLabTest);
route.get('/lab_test/:_id',labTestController.getNewLabTestById);

module.exports = route;
