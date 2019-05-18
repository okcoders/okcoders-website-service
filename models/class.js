const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new mongoose.Schema({
    yearOfClass: Number,
    moduleNumber: Number,
    languages: [{ type: Schema.Types.ObjectId, ref: 'Language' }],
    title: String,
    difficulty: String
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
