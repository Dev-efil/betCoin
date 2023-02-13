const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    points: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);