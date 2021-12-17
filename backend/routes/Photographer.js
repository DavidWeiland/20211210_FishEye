const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const photographerCtrl = require('../controllers/Photographer')

router.post('/private/', auth, multer, photographerCtrl.createPhotographer)
router.get('/private/:id', auth, photographerCtrl.getOnePhotographer)
router.get('/:id', photographerCtrl.getOnePhotographer)
router.get('/', photographerCtrl.getAllPhotographer)
router.put('/private/:id', auth, multer, photographerCtrl.modifyOnePhotographer)
router.delete('/private/:id', auth, photographerCtrl.deleteOnePhotographer)

module.exports = router