// models/wishlist.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String},
    pincode: { type: Number, required: true }, 
    city: { type: String, required: true },
    state: { type: String, required: true },
    landline: { type: String, required: true },
    address: { type: String, required: true },
});

const addressList = mongoose.model('Address', addressSchema);
module.exports = addressList;
