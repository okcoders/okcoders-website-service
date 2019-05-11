const mongoose = require("mongoose")

const classSchema = new mongoose.Schema({
    _id: Number,
    yearOfClass: Number,
    moduleNumber: Number,
    languages: [{type: Number, ref: 'Language'}],
    title: String,
    difficulty: String
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
