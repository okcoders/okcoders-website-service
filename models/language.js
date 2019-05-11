const mongoose = require("mongoose")

const languageSchema = new mongoose.Schema({
    _id: Number,
    language: String
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
