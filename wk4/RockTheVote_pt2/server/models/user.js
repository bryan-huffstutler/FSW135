const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  user: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  memberSince: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model("User", userSchema)