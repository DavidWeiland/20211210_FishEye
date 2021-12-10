const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const photographerSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  id: { type: Number, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  tags: { type: Array, required: true },
  tagline: { type: String, required: true },
  price: { type: Number, required: true },
  portrait: { type: String, required: true },
})

photographerSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Photographer', photographerSchema)