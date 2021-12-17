const Photographer = require('../models/Photographer')

/* exports.createPhotographer = (req, res, next) => {
  const photographerObject = JSON.parse(req.body.thing)
  delete photographerObject._id
  const photographer = new Photographer({
    ...photographerObject,
    portrait: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  photographer.save()
    .then(() => res.status(201).json({message : 'Photographer created !' }))
    .catch(error => res.status(400).json({ error }))
} */

exports.createPhotographer = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing)
  delete thingObject._id;
  const photographer = new Photographer({
    ...thingObject,
    portrait: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
  const photographerObject = req.file ? {
    ...JSON.parse(req.body.thing),
    portrait: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body }
  Photographer.updateOne({ _id: req.params.id },{...photographerObject, _id:req.params.id})
    .then(() => {
      /* res.status(200).json({ message: 'Photographer modified !' }) */
      Photographer.findOne({ _id: req.params.id })
        .then(photographer => res.status(200).json(photographer))
        .catch(error => res.status(400).json({ error }))
    })
  .catch(error=> res.status(400).json({error}))
}

exports.deleteOnePhotographer = (req, res, next) => {
  Photographer.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({message:'Photographer deleted !'}))
  .catch(error=> res.status(400).json({error}))
}