let express = require('express');
let route= express.Router();
let signup = require('../controller/user');

const profile = require('../controller/profile');
const auth = require('../middleWare/auth');

route.post('/signup',signup.register);
route.get('/user',signup.get);
route.delete('/user/:id',signup.delete);
route.post('/login',signup.login);


route.get('/profile', auth.isAuth, profile.profile);

module.exports=route;