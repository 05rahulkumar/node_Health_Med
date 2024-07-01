const CartModel = require('../models/cart');
const msg = require('../Services/responseMSG');

module.exports = {
    createCart: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const { product, qty } = req.body;
            const userId = req.userData.reid; // Assuming `reid` is the user ID in your token payload
            // Check if the product is already in the user's cart
            let cartItem = await CartModel.findOne({ user: userId, product });
            if (cartItem) {
                // If product already exists, update the quantity
                cartItem.qty += qty;
                await cartItem.save();
                res.status(200).json({ success: true, msg: 'Quantity updated in cart', cartItem });
            } else {
                // Otherwise, create a new cart item for the user
                const newCartItem = new CartModel({ user: userId, product, qty });
                const result = await newCartItem.save();
                res.status(201).json({ success: true, msg: msg[defaultMsg].Create, result });
            }
        } catch (err) {
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    getCart: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const userId = req.userData.reid; // Assuming `reid` is the user ID in your token payload
            const cart = await CartModel.find({ user: userId }).populate('product');
            res.status(200).json({ success: true, msg: msg[defaultMsg].Read, cart });
        } catch (err) {
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    getCartById: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const userId = req.userData.reid; // Assuming `reid` is the user ID in your token payload
            const cart = await CartModel.findOne({ _id: req.params._id, user: userId }).populate('product');
            if (!cart) {
                return res.status(404).json({ success: false, msg: 'Cart not found' });
            }
            res.status(200).json({ success: true, msg: msg[defaultMsg].ReadById, cart });
        } catch (err) {
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    updateCart: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const { qty } = req.body;
            const userId = req.userData.reid; // Assuming `reid` is the user ID in your token payload

            // Find and update the user's cart item
            const cartItem = await CartModel.findOneAndUpdate({ _id: req.params._id, user: userId }, { qty }, { new: true });

            if (!cartItem) {
                return res.status(404).json({ success: false, msg: 'Cart item not found' });
            }

            res.status(200).json({ success: true, msg: msg[defaultMsg].Update, cartItem });
        } catch (err) {
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    deleteCart: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const userId = req.userData.reid; // Assuming `reid` is the user ID in your token payload
            const cart = await CartModel.findOneAndDelete({ _id: req.params._id, user: userId });
            if (!cart) {
                return res.status(404).json({ success: false, msg: 'Cart not found' });
            }
            res.status(202).json({ success: true, msg: msg[defaultMsg].Delete });
        } catch (err) {
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },
};
