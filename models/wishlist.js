// models/wishlist.js
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
    qty: { type: Number, required: true },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;