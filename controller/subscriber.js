const Subscription = require('../models/subscribe');
const msg = require('../Services/responseMSG'); // Assuming you have this service for response messages

module.exports = {
    // POST API to subscribe an email
    subscribe: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const { email } = req.body;
            // Check if email already exists
            let existingSubscription = await Subscription.findOne({ email });
            if (existingSubscription) {
                return res.status(409).json({ success: false, msg: 'Email already subscribed' });
            }
            const newSubscription = new Subscription({ email });
            const result = await newSubscription.save();
            res.status(201).json({ success: true, msg: msg[defaultMsg].Create, result });
        } catch (err) {
            console.error(err); // Log the error to debug further
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    // GET API to get all subscriptions
    getSubscriptions: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const subscriptions = await Subscription.find();
            res.status(200).json({ success: true, msg: msg[defaultMsg].Read, subscriptions });
        } catch (err) {
            console.error(err); // Log the error to debug further
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },
    deleteSubscription: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            let data = await Subscription.deleteOne(req.params);
            res.status(202).json({ success: true, msg: msg[defaultMsg].Delete });
        } catch (err) {
            return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err })
        }
    },
};
