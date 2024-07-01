const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderSummaryId: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderSummary', required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    paymentMethod: { type: String, enum: ['COD', 'online'], required: true },
    orderType: { type: String, enum: ['online', 'COD'], required: true } // Added orderType field
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
