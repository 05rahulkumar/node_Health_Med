const labTestModel = require('../models/labTest');
let msg = require('../Services/responseMSG');

module.exports = {
createNewLabTest: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const { title,notes,booking_id,reason} = req.body;
        let image = req.file ? req.file.path.replace(/\\/g, '/') : null;
        const newNewLabTest = new labTestModel({ title,image,notes,booking_id,reason,});
        const result = await newNewLabTest.save();
        res.status(201).json({ success: true, msg: msg[defaultMsg].Create, result });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
getNewLabTest: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const NewLabTest = await labTestModel.find();
        res.status(200).json({ success: true, msg: msg[defaultMsg].create, NewLabTest });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
deleteNewLabTest: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        let data = await labTestModel.deleteOne(req.params);
        res.status(202).json({ success: true, msg: msg[defaultMsg].Delete });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err })
    }
},
updateNewLabTest: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        let updateData = { title: req.body.title,notes: req.body.notes,booking_id:req.body.booking_id,reason:req.body.reason };
        if (req.file) {
            updateData.image = req.file.path.replace(/\\/g, '/');
        }
        const data = await labTestModel.findOneAndUpdate({ _id: req.params._id }, updateData, { new: true });
        if (!data) {
            return res.status(404).json({ success: false, msg: msg[defaultMsg].NewLabTest_Not_Found });
        }
        res.status(202).json({ success: true, msg: msg[defaultMsg].Update, data });
    } catch (err) {
        return res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
getNewLabTestById: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const data = await labTestModel.findById(req.params._id);
        res.status(200).json({ success: true, msg: msg[defaultMsg].ReadById, data });
    } catch (err) {
        return res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
}