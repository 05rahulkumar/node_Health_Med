const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String, required: true, index: { unique: true },
        // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(    ?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    userType: { type: String, enum: ['Admin', 'Customer'], required: true },
    date: { type: Date, default: Date.now }
});

const signupModel = mongoose.model('registration', signupSchema);

module.exports = signupModel;
