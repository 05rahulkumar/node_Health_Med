const route = require('express').Router();
let user =require('../routes/userRoutes');
let banner =require('../routes/banner');
let category =require('../routes/category');
let newLaunch =require('../routes/newLounch');
let labTest = require('../routes/labTest');
let product = require('../routes/product');
let ratingAndReview = require('../routes/rating&review');
let wishlist = require('../routes/wishlist');
let cart = require('../routes/cart');
let address = require('../routes/address');
let orderSummary = require('../routes/orderSummary');
let order = require('../routes/order');


route.use('',user);
route.use('',banner);
route.use('',category);
route.use('',newLaunch);
route.use('',labTest);
route.use('',product);
route.use('',ratingAndReview);
route.use('',wishlist);
route.use('',cart);
route.use('',address);
route.use('',orderSummary);
route.use('',order);

module.exports=route