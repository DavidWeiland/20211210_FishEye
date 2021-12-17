const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const photographerSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  tags: { type: Array, required: true },
  tagline: { type: String, required: true },
  price: { type: Number, required: true },
  portraitUrl: { type: String, required: false },
})

photographerSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Photographer', photographerSchema)