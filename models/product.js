// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // image: { type: String, required: true },
    images: [{
        image: { type: String },
    }],
    qty: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    discount: { type: Number, required: true },
    amount: { type: Number, required: true },
    final_amount: { type: Number, required: true },
    rating: { type: String, required: true },
    is_cart: { type: Boolean, required: true },
    is_wishlist: { type: Boolean, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RatingAndReview' }]
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
