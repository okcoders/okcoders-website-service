const mongoose = require("mongoose")

const classSchema = new mongoose.Schema({
    yearOfClass: Number,
    moduleNumber: Number,
    languageTags: String,
    title: String,
    dificulty: String
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;