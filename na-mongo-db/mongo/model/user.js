const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  bd: Date
})

module.exports = mongoose.model('users', userSchema)