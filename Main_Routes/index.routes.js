const route = require('express').Router();
let user =require('../routes/userRoutes');
let banner =require('../routes/banner');
let category =require('../routes/category');
let newLaunch =require('../routes/newLounch');

route.use('',user);
route.use('',banner);
route.use('',category);
route.use('',newLaunch);

module.exports=route