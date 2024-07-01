const addressModel = require('../models/address');
let msg = require('../Services/responseMSG');

module.exports = {
createAddress: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const { name,phone,email,pincode,city,state,landline,address } = req.body;
       
        const addr = new addressModel({ name,phone,email,pincode,city,state,landline,address});
        const result = await addr.save();
        res.status(201).json({ success: true, msg: msg[defaultMsg].Create, result });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
getAddress: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const address = await addressModel.find();
        res.status(200).json({ success: true, msg: msg[defaultMsg].Read, address });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
deleteAddress: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        let data = await addressModel.deleteOne(req.params);
        res.status(202).json({ success: true, msg: msg[defaultMsg].Delete });
    } catch (err) {
        return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err })
    }
},
updateAddress: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        let updateData = { name: req.body.name, phone:req.body.phone, email: req.body.email, pincode:req.body.pincode, city: req.body.city, state: req.body.state, landline:req.body.landline, address:req.body.address};
      
        const data = await addressModel.findOneAndUpdate({ _id: req.params._id }, updateData, { new: true });
        if (!data) {
            return res.status(404).json({ success: false, msg: msg[defaultMsg].NewLaunch_Not_Found });
        }
        res.status(202).json({ success: true, msg: msg[defaultMsg].Update, data });
    } catch (err) {
        return res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
getAddressById: async (req, res) => {
    let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
    try {
        const data = await addressModel.findById(req.params._id);
        res.status(200).json({ success: true, msg: msg[defaultMsg].ReadById, data });
    } catch (err) {
        return res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
    }
},
}