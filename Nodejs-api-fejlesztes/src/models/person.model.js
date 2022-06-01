const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post' // One-to-many összekötés
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model('Person', personSchema)