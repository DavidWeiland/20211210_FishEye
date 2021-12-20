const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const mediaCtrl = require('../controllers/Media')
const multer = require('../middleware/multer-config')

router.post('/private/', auth, multer, mediaCtrl.createMedia)
router.get('/:userId', mediaCtrl.getAllMediaOfOnePhotographer)
router.get('/:id', mediaCtrl.getOneMedia)
router.put('/private/:id', auth, multer, mediaCtrl.modifyOneMedia)
router.delete('/private/:id', auth, mediaCtrl.deleteOneMedia)

module.exports = router