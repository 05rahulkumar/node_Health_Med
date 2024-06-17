// models/category.js
const mongoose = require('mongoose');

const newLaunchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    discount: { type: Number, required: true },
    amount:{type:Number,required:true},
    final_amount: { type: Number, required: true },
});
const NewLaunch = mongoose.model('NewLaunch', newLaunchSchema);
module.exports = NewLaunch;
