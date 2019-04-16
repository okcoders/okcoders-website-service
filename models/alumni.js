const mongoose = require("mongoose")

const alumniSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni
