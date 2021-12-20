const mongoose = require('mongoose')

const mediaSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  mediaUrl: { type: String, required: true },
  tags: { type: Array, required: true },
  likes: { type: Number, required: true },
  date: { type: String, required: true },
  price: { type: Number, required: true }
})

module.exports = mongoose.model('Media', mediaSchema)