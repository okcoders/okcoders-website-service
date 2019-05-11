const mongoose = require("mongoose")

const alumniSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  bio: String,
  birthday: String,
  avatar: String,
  linkedin: String,
  github: String,
  classes: [{ type: Number, ref: 'Class' }]
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni
