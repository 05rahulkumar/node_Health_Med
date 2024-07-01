let express = require('express');
let route= express.Router();
let cart = require('../controller/cart');
const auth = require('../middleWare/auth');


route.get('/cart', auth.isAuth, cart.getCart);
route.post('/cart', auth.isAuth, cart.createCart);
route.delete('/cart/:_id', auth.isAuth, cart.deleteCart);
route.put('/cart/:_id', auth.isAuth, cart.updateCart);
route.get('/cart/:_id', auth.isAuth, cart.getCartById);

module.exports=route;