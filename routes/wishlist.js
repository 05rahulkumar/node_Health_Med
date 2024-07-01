let express = require('express');
let route= express.Router();
let wishlist = require('../controller/wishlist');
const auth = require('../middleWare/auth');


route.get('/wishlist', auth.isAuth, wishlist.getWishList);
route.post('/wishlist', auth.isAuth, wishlist.addWishList);
route.delete('/wishlist/:_id', auth.isAuth, wishlist.deleteWishList);
route.put('/wishlist/:_id', auth.isAuth, wishlist.updateWishList);
route.get('/wishlist/:_id', auth.isAuth, wishlist.getWishListById);

module.exports=route;