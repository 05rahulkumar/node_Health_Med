// models/wishlist.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
    qty: { type: Number, required: true },
});

const cartList = mongoose.model('Cart', cartSchema);
module.exports = cartList;
