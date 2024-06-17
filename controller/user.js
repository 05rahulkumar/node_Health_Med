let signupModel = require('../models/user');
let msg = require('../Services/responseMSG');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        let { name, email, userType, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(501).json({ msg: "password not match" });
        }

        try {
            let hash = await bcrypt.hash(password, 10);
            let data = new signupModel({
                name,
                email,
                userType,
                password: hash
            });

            let savedUser = await data.save();
            res.status(201).json({ success: true, msg: "successfully registered", result: savedUser });
        } catch (error) {
            res.status(501).json({ success: false, msg: 'something wrong', error });
        }
    },

    login: async (req, res) => {
        let { email, password } = req.body;

        try {
            let user = await signupModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ msg: "user does not exist" });
            }

            let match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(404).json({ msg: "Authorization Password Wrong" });
            }

            let token = jwt.sign({
                email: user.email,
                reid: user._id
            }, 'secret', { expiresIn: '1d' });

            res.status(201).json({ success: true, message: "user login successful", token });
        } catch (error) {
            res.status(501).json({ success: false, error });
        }
    },

    get: async (req, res) => {
        let defaultMsg = req.headers.defaulLang || 'en';
        try {
            let data = await signupModel.find();
            res.json({ success: true, msg: msg[defaultMsg].Read, data });
        } catch (error) {
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: error.message, language: defaultMsg });
        }
    },

    delete: async (req, res) => {
        let defaultLang = req.headers.defaultlang || 'en';
        try {
            await signupModel.findOneAndDelete({ _id: req.params.id });
            res.json({ success: true, msg: msg[defaultLang].Delete });
        } catch (err) {
            res.status(500).json({ success: false, msg: msg[defaultLang].Something_Went_Wrong, error: err.message, lang: defaultLang });
        }
    }
};
