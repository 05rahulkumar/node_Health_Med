const Tracking = require('../models/tracking');
const msg = require('../Services/responseMSG');

module.exports = {
    createTracking: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const { trackingId, status } = req.body;

            const newTracking = new Tracking({
                trackingId,
                status
            });

            const result = await newTracking.save();

            res.status(201).json({ success: true, msg: msg[defaultMsg].Create, result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    getTrackingById: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const { trackingId } = req.params;

            const tracking = await Tracking.find({ trackingId });

            if (!tracking) {
                return res.status(404).json({ success: false, msg: 'Tracking not found' });
            }

            res.status(200).json({ success: true, msg: msg[defaultMsg].Read, tracking });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    // Other controller methods can be added here as needed
};
