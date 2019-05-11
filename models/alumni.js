const mongoose = require("mongoose")

const alumniSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  linkedin: String,
  github: String,
  bio: String,
  birthday: String
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni
