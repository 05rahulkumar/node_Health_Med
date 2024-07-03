const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
    orderId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Assuming orderId is a string, adjust as necessary
    status: { type: String, required: true },
    location: { type: String }
}, { timestamps: true });

const Tracking = mongoose.model('Tracking', trackingSchema);

module.exports = Tracking;
