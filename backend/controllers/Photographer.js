const Photographer = require('../models/Photographer')
const fs = require('fs')

exports.createPhotographer = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing)
  delete thingObject._id;
  const photographer = new Photographer({
    ...thingObject,
    portraitUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  photographer.save()
    .then(() => res.status(201).json({ message: 'Photographer OK' }))
    .catch(error => res.status(400).json({ error }))
}

exports.getOnePhotographer = (req, res, next) => {
  Photographer.findOne({ userId: req.params.id })
    .then(photographer => res.status(200).json(photographer))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllPhotographer = (req, res, next) => {
  Photographer.find()
    .then(photographer => res.status(200).json(photographer))
    .catch(error => res.status(400).json({ error }))
}

exports.modifyOnePhotographer = (req, res, next) => {
  if (req.file) {
    const photographerObject = {
      ...JSON.parse(req.body.thing),
      portraitUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    Photographer.findOne({ _id: req.params.id })
      .then(photographer => {
        const filename = photographer.portraitUrl.split('/images/')[ 1 ]
        fs.unlink(`images/${filename}`, () => {
          Photographer.updateOne({ _id: req.params.id }, { ...photographerObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Photographer modified !' }))
            .catch(error => res.status(400).json({ error }))
        })
      })
      .catch (error => res.status(500).json({ error }))
  } else {
    const photographerObject = { ...req.body }
    Photographer.updateOne({ _id: req.params.id },{...photographerObject, _id:req.params.id})
    .then(() => res.status(200).json({message:'Photographer modified !'}))
    .catch(error=> res.status(400).json({error}))
  }
}

exports.deleteOnePhotographer = (req, res, next) => {
  Photographer.findOne({ _id: req.params.id })
    .then(photographer => {
      if (!photographer) {
        return res.status(404).json({
          error: new Error('Photographer not found')
        })
      }
      if (photographer.userId !== req.auth.userId) {
        return res.status(401).json({
          error: new Error('request non authorized')
        })
      }
      const filename = photographer.portraitUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        Photographer.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({message: 'Photographer deleted !'}))
          .catch((error) => res.status(400).json({ error }))
      })
    })
    .catch(error => res.status(500).json({ error }))
}