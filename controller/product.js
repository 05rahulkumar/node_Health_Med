const productModel = require('../models/product');
let msg = require('../Services/responseMSG');

module.exports = {
createProduct: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const { name,color,size,discount,amount,final_amount,rating,is_cart,is_wishlist } = req.body;
        let image = req.file ? req.file.path.replace(/\\/g, '/') : null;
        const product = new productModel({ name, image,color,size,discount,amount,final_amount,rating,is_cart,is_wishlist});
        const result = await product.save();
        res.status(201).json({ success: true, msg: msg[defaultMsg].Create, result });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
getProduct: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const product = await productModel.find().populate('reviews');
        res.status(200).json({ success: true, msg: msg[defaultMsg].create, product });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
deleteProduct: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        let data = await productModel.deleteOne(req.params);
        res.status(202).json({ success: true, msg: msg[defaultMsg].Delete });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err })
    }
},
updateProduct: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        let updateData = { name: req.body.name,color: req.body.color,size: req.body.size,discount: req.body.discount,amount: req.body.amount,final_amount: req.body.final_amount,rating:req.body.rating,is_cart:req.body.is_cart,is_wishlist:req.body.is_wishlist};
        if (req.file) {
            updateData.image = req.file.path.replace(/\\/g, '/');
        }
        const data = await productModel.findOneAndUpdate({ _id: req.params._id }, updateData, { new: true });
        if (!data) {
            return res.status(404).json({ success: false, msg: msg[defaultMsg].NewLaunch_Not_Found });
        }
        res.status(202).json({ success: true, msg: msg[defaultMsg].Update, data });
    } catch (err) {
        return res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
getProductById: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const data = await productModel.findById(req.params._id).populate('reviews');
        res.status(200).json({ success: true, msg: msg[defaultMsg].ReadById, data });
    } catch (err) {
        return res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
}