const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const mediaCtrl = require('../controllers/Media')
const multer = require('../middleware/multer-config')

router.post('/', auth, multer, mediaCtrl.createMedia)
router.get('/:photographerId', mediaCtrl.getAllMediaOfOnePhotographer)
router.get('/:id', mediaCtrl.getOneMedia)
router.put('/:id', auth, multer, mediaCtrl.modifyOneMedia)
router.delete('/:id', auth, mediaCtrl.deleteOneMedia)

module.exports = router