const Order = require('../models/order'); // Assuming you have a model for orders
const msg = require('../Services/responseMSG'); // Assuming you have a response message service

module.exports = {
    cancelOrder: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const { orderId } = req.body;
            // Find the order by orderId and update the status to cancelled
            const updatedOrder = await Order.findOneAndUpdate(
                { _id: orderId },
                { $set: { status: 'cancelled' } },
                { new: true }
            );
            if (!updatedOrder) {
                return res.status(404).json({ success: false, msg: 'Order not found' });
            }
            res.status(200).json({ success: true, msg: msg[defaultMsg].Order_Cancelled, updatedOrder });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    returnOrder: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const { orderId } = req.body;
            // Find the order by orderId and update the status to returned
            const updatedOrder = await Order.findOneAndUpdate(
                { _id: orderId },
                { $set: { status: 'returned' } },
                { new: true }
            );
            if (!updatedOrder) {
                return res.status(404).json({ success: false, msg: 'Order not found' });
            }
            res.status(200).json({ success: true, msg: msg[defaultMsg].Order_Returned, updatedOrder });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    getCancelledOrders: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const userId = req.userData.reid; // Assuming the user ID is available in req.userData
            const cancelledOrders = await Order.find({ userId, status: 'cancelled' });

            res.status(200).json({ success: true, msg: msg[defaultMsg].Read, cancelledOrders });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    getReturnedOrders: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const userId = req.userData.reid; // Assuming the user ID is available in req.userData
            const returnedOrders = await Order.find({ userId, status: 'returned' });

            res.status(200).json({ success: true, msg: msg[defaultMsg].Read, returnedOrders });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    }
};
