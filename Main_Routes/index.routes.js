const route = require('express').Router();

let signupLogin=require('../Routes/signupRoute')
let addProduct=require('../Routes/addProductRoutes')
let searchProduct=require('../Routes/searchProductRoutes')
let userRoute=require('../Routes/userRoutes')
let cart =require('../Routes/cartRoutes')

route.use('/seller',signupLogin);
route.use('/addProduct',addProduct);
route.use('/searchProduct',searchProduct);
route.use('/user',userRoute);
route.use('/cart',cart)
module.exports=route