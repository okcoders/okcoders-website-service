const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const alumniSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  bio: String,
  birthday: String,
  avatar: String,
  linkedin: String,
  github: String,
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni
