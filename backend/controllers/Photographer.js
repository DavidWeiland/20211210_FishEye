const Photographer = require('../models/Photographer')

exports.createPhotographer = (req, res, next) => {
  delete req.body._id
  const photographer = new Photographer({
    ...req.body
  })
  photographer.save()
    .then(() => res.status(201).json({message : 'Photographer created !' }))
    .catch(error => res.status(400).json({ error }))
}

exports.getOnePhotographer = (req, res, next) => {
  Photographer.findOne({ _id: req.params.id })
    .then(photographer => res.status(200).json(photographer))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllPhotographer = (req, res, next) => {
  Photographer.find()
    .then(photographer => res.status(200).json(photographer))
    .catch(error => res.status(400).json({ error }))
}

exports.modifyOnePhotographer = (req, res, next) => {
  Photographer.updateOne({ _id: req.params.id },{...req.body, _id:req.params.id})
  .then(() => res.status(200).json({message:'Photographer modified !'}))
  .catch(error=> res.status(400).json({error}))
}

exports.deleteOnePhotographer = (req, res, next) => {
  Photographer.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({message:'Photographer deleted !'}))
  .catch(error=> res.status(400).json({error}))
}