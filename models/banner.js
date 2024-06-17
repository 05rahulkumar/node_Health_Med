// models/banner.js
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Banner', bannerSchema);