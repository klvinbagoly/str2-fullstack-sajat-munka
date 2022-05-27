const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
}, {
  timestamps: true
})

module.exports = mongoose.model('Person', personSchema)