// controller/ratingAndReview.js
const RatingAndReview = require('../models/rating&Review');
const Product = require('../models/product');
let msg = require('../Services/responseMSG');

module.exports = {
    createRatingAndReview: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const { userId, productId, rating, review } = req.body;
            const newRatingAndReview = new RatingAndReview({ userId, productId, rating, review });
            const result = await newRatingAndReview.save();

            // Add the review to the product
            await Product.findByIdAndUpdate(productId, { $push: { reviews: result._id } });
            res.status(201).json({ success: true, msg: msg[defaultMsg].Create, result });
        } catch (err) {
            return res.status(400).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
        }
    },
    getRatingAndReviews: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const ratingAndReviews = await RatingAndReview.find();
            res.status(200).json({ success: true, msg: msg[defaultMsg].Read, ratingAndReviews });
        } catch (err) {
            return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
        }
    },
    getRatingAndReviewById: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const ratingAndReview = await RatingAndReview.findById(req.params.id);
            if (!ratingAndReview) {
                return res.status(404).json({ success: false, msg: msg[defaultMsg].NotFound });
            }
            res.status(200).json({ success: true, msg: msg[defaultMsg].ReadById, ratingAndReview });
        } catch (err) {
            return res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
        }
    },
    updateRatingAndReview: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const { rating, review } = req.body;
            const updateData = { rating, review };
            const ratingAndReview = await RatingAndReview.findByIdAndUpdate(req.params.id, updateData, { new: true });
            if (!ratingAndReview) {
                return res.status(404).json({ success: false, msg: msg[defaultMsg].NotFound });
            }
            res.status(202).json({ success: true, msg: msg[defaultMsg].Update, ratingAndReview });
        } catch (err) {
            return res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
        }
    },
    deleteRatingAndReview: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const ratingAndReview = await RatingAndReview.findByIdAndDelete(req.params.id);
            if (!ratingAndReview) {
                return res.status(404).json({ success: false, msg: msg[defaultMsg].NotFound });
            }
            res.status(202).json({ success: true, msg: msg[defaultMsg].Delete });
        } catch (err) {
            return res.status(404).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg, err });
        }
    }
};
