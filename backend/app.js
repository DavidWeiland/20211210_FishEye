require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const mediaRoutes = require('./routes/Media')
const photographerRoutes = require('./routes/Photographer')
const userRoutes = require('./routes/User')
const path = require('path')

mongoose.connect(process.env.DB_URI, {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology:true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/media', mediaRoutes)
app.use('/api/photographer', photographerRoutes)
app.use('/api/auth', userRoutes)

module.exports = app