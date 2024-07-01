// models/ratingAndReview.js
const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const RatingAndReview = mongoose.model('RatingAndReview', ratingAndReviewSchema);

module.exports = RatingAndReview;
