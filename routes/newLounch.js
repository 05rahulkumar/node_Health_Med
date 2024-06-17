// routes/banner.routes.js
const express = require('express');
let route= express.Router();
const newLaunchController = require('../controller/newLounche');
const upload = require('../MulterUpload/upload');

route.post('/new_launch', upload.single('image'),newLaunchController.createNewLaunch);
route.get('/new_launch',newLaunchController.getNewLaunch);
route.delete('/new_launch/:_id',newLaunchController.deleteNewLaunch);
route.put('/new_launch/:_id',upload.single('image'),newLaunchController.updateNewLaunch);
route.get('/new_launch/:_id',newLaunchController.getNewLaunchById);

module.exports = route;
