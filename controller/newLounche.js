const newLaunchModel = require('../models/newLaunches');
let msg = require('../Services/responseMSG');

module.exports = {
createNewLaunch: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const { name,color,size,discount,amount,final_amount } = req.body;
        let image = req.file ? req.file.path.replace(/\\/g, '/') : null;
        const newNewLaunch = new newLaunchModel({ name, image,color,size,discount,amount,final_amount});
        const result = await newNewLaunch.save();
        res.status(201).json({ success: true, msg: msg[defaultMsg].Create, result });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
getNewLaunch: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const newlaunch = await newLaunchModel.find();
        res.status(200).json({ success: true, msg: msg[defaultMsg].create, newlaunch });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
deleteNewLaunch: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        let data = await newLaunchModel.deleteOne(req.params);
        res.status(202).json({ success: true, msg: msg[defaultMsg].Delete });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err })
    }
},
updateNewLaunch: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        let updateData = { name: req.body.name,color: req.body.color,size: req.body.size,discount: req.body.discount,amount: req.body.amount,final_amount: req.body.final_amount };
        if (req.file) {
            updateData.image = req.file.path.replace(/\\/g, '/');
        }
        const data = await newLaunchModel.findOneAndUpdate({ _id: req.params._id }, updateData, { new: true });
        if (!data) {
            return res.status(404).json({ success: false, msg: msg[defaultMsg].NewLaunch_Not_Found });
        }
        res.status(202).json({ success: true, msg: msg[defaultMsg].Update, data });
    } catch (err) {
        return res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
getNewLaunchById: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const data = await newLaunchModel.findById(req.params._id);
        res.status(200).json({ success: true, msg: msg[defaultMsg].ReadById, data });
    } catch (err) {
        return res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
}