const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const mediaCtrl = require('../controllers/Media')
const multer = require('../middleware/multer-config')

router.post('/', auth, multer, mediaCtrl.createMedia)
router.get('/public/:userId', mediaCtrl.getAllMediaOfOnePhotographer)
router.get('/:id', auth, mediaCtrl.getOneMedia)
router.put('/:id', auth, multer, mediaCtrl.modifyOneMedia)
router.put('/public/:id', mediaCtrl.likeOneMedia)
router.delete('/:id', auth, mediaCtrl.deleteOneMedia)

module.exports = router