const mongoose = require('mongoose');

const orderSummarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
    }],
});

const OrderSummary = mongoose.model('OrderSummary', orderSummarySchema);

module.exports = OrderSummary;
