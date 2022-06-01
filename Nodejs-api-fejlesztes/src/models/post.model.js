const mongoose = require('mongoose')
const idValidator = require('mongoose-id-validator')

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  // A szerző mongoDB azonosítója.
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person', // Összekötés a Person schemával.
    required: true
  }
}, {
  timestamps: true
})

PostSchema.plugin(idValidator)

module.exports = mongoose.model('Post', PostSchema)
