const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String, require: true },
    points: { type: Number, required: true },
    refreshToken: [String]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);