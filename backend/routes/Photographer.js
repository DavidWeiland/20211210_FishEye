const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const photographerCtrl = require('../controllers/Photographer')

router.post('/', auth, photographerCtrl.createPhotographer)
router.get('/:id', photographerCtrl.getOnePhotographer)
router.get('/', photographerCtrl.getAllPhotographer)
router.put('/:id', auth, photographerCtrl.modifyOnePhotographer)
router.delete('/:id', auth, photographerCtrl.deleteOnePhotographer)

module.exports = router