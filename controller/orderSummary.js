const OrderSummary = require('../models/orderSummary');
const CartModel = require('../models/cart');
const msg = require('../Services/responseMSG'); // Assuming you have this service for response messages

module.exports = {
    createOrderSummary: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const { cartIds } = req.body;
            const userId = req.userData.reid; // Ensure the correct user ID key is used here

            // Fetch all cart items based on provided cartIds
            const carts = await CartModel.find({ _id: { $in: cartIds }, userId }).populate('product');

            if (!carts.length) {
                return res.status(404).json({ success: false, msg: 'No cart items found' });
            }

            // Create order summary
            const products = carts.map(cart => ({
                cartId: cart._id
            }));

            const orderSummary = new OrderSummary({
                userId,
                products
            });

            const result = await orderSummary.save();

            res.status(201).json({ success: true, msg: msg[defaultMsg].Create, result });
        } catch (err) {
            console.error(err); // Log the error to debug further
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },
    
    getOrderSummary: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const userId = req.userData.reid; // Ensure the correct user ID key is used here
            const orderSummaries = await OrderSummary.find({ userId }).populate({
                path: 'products.cartId',
                populate: {
                    path: 'product'
                }
            });

            res.status(200).json({ success: true, msg: msg[defaultMsg].Read, orderSummaries });
        } catch (err) {
            console.error(err); // Log the error to debug further
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    }
};
