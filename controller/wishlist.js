const wishListModel = require('../models/wishlist');
const msg = require('../Services/responseMSG');

module.exports = {
    addWishList: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const { product, qty } = req.body;
            const userId = req.userData.reid; // Assuming `reid` is the user ID in your token payload
            // Check if the product is already in the user's wishlist
            let wishlistItem = await wishListModel.findOne({ user: userId, product });
            if (wishlistItem) {
                // If product already exists, update the quantity
                wishlistItem.qty += qty;
                await wishlistItem.save();
                res.status(200).json({ success: true, msg: 'Quantity updated in wishlist', wishlistItem });
            } else {
                // Otherwise, create a new wishlist item for the user
                const newwishlistItem = new wishListModel({ user: userId, product, qty });
                const result = await newwishlistItem.save();
                res.status(201).json({ success: true, msg: msg[defaultMsg].Create, result });
            }
        } catch (err) {
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    getWishList: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const userId = req.userData.reid; // Assuming `reid` is the user ID in your token payload
            const wishlist = await wishListModel.find({ user: userId }).populate('product');
            res.status(200).json({ success: true, msg: msg[defaultMsg].Read, wishlist });
        } catch (err) {
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    getWishListById: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const userId = req.userData.reid; // Assuming `reid` is the user ID in your token payload
            const wishlist = await wishListModel.findOne({ _id: req.params._id, user: userId }).populate('product');
            if (!wishlist) {
                return res.status(404).json({ success: false, msg: 'wishlist not found' });
            }
            res.status(200).json({ success: true, msg: msg[defaultMsg].ReadById, wishlist });
        } catch (err) {
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    updateWishList: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const { qty } = req.body;
            const userId = req.userData.reid; // Assuming `reid` is the user ID in your token payload

            // Find and update the user's wishlist item
            const wishlistItem = await wishListModel.findOneAndUpdate({ _id: req.params._id, user: userId }, { qty }, { new: true });

            if (!wishlistItem) {
                return res.status(404).json({ success: false, msg: 'wishlist item not found' });
            }

            res.status(200).json({ success: true, msg: msg[defaultMsg].Update, wishlistItem });
        } catch (err) {
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },

    deleteWishList: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const userId = req.userData.reid; // Assuming `reid` is the user ID in your token payload
            const wishlist = await wishListModel.findOneAndDelete({ _id: req.params._id, user: userId });
            if (!wishlist) {
                return res.status(404).json({ success: false, msg: 'wishlist not found' });
            }
            res.status(202).json({ success: true, msg: msg[defaultMsg].Delete });
        } catch (err) {
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },
};
