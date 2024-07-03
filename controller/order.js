const Order = require('../models/order');
const OrderSummary = require('../models/orderSummary');
const msg = require('../Services/responseMSG');

module.exports = {
    createOrder: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const { orderSummaryId, paymentMethod,trackingStatus } = req.body;
            const userId = req.userData.reid;

            // Validate if OrderSummary exists
            const orderSummaryExists = await OrderSummary.findById(orderSummaryId);
            if (!orderSummaryExists) {
                return res.status(404).json({ success: false, msg: 'OrderSummary not found' });
            }
            const newOrder = new Order({
                userId,
                orderSummaryId,
                paymentStatus: 'pending', // Default payment status
                paymentMethod,
                trackingStatus:'order placed'
            });

            const result = await newOrder.save();

            res.status(201).json({ success: true, msg: msg[defaultMsg].successFully, result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    getOrder: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const userId = req.userData.reid;
            let query = { userId };

            const orders = await Order.find(query).populate('orderSummaryId');

            res.status(200).json({ success: true, msg: msg[defaultMsg].Read, orders });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    }
};
