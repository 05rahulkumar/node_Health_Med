// models/category.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const labTestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    notes: { type: String, required: true },
    booking_id: { type: String, required: true, unique: true, default: uuidv4 },
    reason: { type: String, required: true },
});
const labTest = mongoose.model('labTest', labTestSchema);
module.exports = labTest;
