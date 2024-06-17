const categoryModel = require('../models/categorySchema');
let msg = require('../Services/responseMSG');

module.exports = {
createCategory: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const { name } = req.body;
        let image = req.file ? req.file.path.replace(/\\/g, '/') : null;
        const newCategory = new categoryModel({ name, image });
        const result = await newCategory.save();
        res.status(201).json({ success: true, msg: msg[defaultMsg].Create, result });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
getCategories: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const categories = await categoryModel.find();
        res.status(200).json({ success: true, msg: msg[defaultMsg].create, categories });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
deleteCategory: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        let data = await categoryModel.deleteOne(req.params);
        res.status(202).json({ success: true, msg: msg[defaultMsg].Delete });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err })
    }
},
updateCategory: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        let updateData = { name: req.body.name };
        if (req.file) {
            updateData.image = req.file.path.replace(/\\/g, '/');
        }
        const data = await categoryModel.findOneAndUpdate({ _id: req.params._id }, updateData, { new: true });
        if (!data) {
            return res.status(404).json({ success: false, msg: msg[defaultMsg].Category_Not_Found });
        }
        res.status(202).json({ success: true, msg: msg[defaultMsg].Update, data });
    } catch (err) {
        return res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
getCategoryById: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const data = await categoryModel.findById(req.params._id);
        res.status(200).json({ success: true, msg: msg[defaultMsg].ReadById, data });
    } catch (err) {
        return res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
}