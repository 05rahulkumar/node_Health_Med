const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderSummaryId: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderSummary', required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    paymentMethod: { type: String, enum: ['COD', 'online'], required: true },
    trackingId: { type: String, unique: true },
    trackingStatus: { type: String, enum: ['order placed','order proceed','delivered', 'shipped', 'out of delivery'] }
});

// Pre-save hook to generate unique tracking ID
orderSchema.pre('save', function (next) {
    if (!this.trackingId) {
        this.trackingId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
