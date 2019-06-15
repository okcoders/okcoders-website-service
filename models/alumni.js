const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// Modify alumni model to have a verified key

const alumniSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  bio: String,
  birthday: String,
  avatar: String,
  linkedin: String,
  github: String,
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  verified: Boolean,
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni
