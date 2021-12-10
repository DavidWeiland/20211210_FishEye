const mongoose = require('mongoose')

const mediaSchema = mongoose.Schema({
  photographerId: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  tags: { type: Array, required: true },
  likes: { type: Number, required: true },
  date: { type: String, required: true },
  price: { type: Number, required: true }
})

module.exports = mongoose.model('Media', mediaSchema)