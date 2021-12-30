const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const photographerCtrl = require('../controllers/Photographer')

router.post('/', auth, multer, photographerCtrl.createPhotographer)
router.get('/', photographerCtrl.getAllPhotographer)
router.get('/:id', photographerCtrl.getOnePhotographer)
router.put('/:id', auth, multer, photographerCtrl.modifyOnePhotographer)
router.delete('/:id', auth, photographerCtrl.deleteOnePhotographer)

module.exports = router