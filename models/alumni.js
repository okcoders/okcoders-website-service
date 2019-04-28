const mongoose = require("mongoose")

const alumniSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  bio: String,
  birthday: String,
  avatar: String,
  linkedin: String,
  github: String
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni
