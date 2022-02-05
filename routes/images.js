const express = require('express')
const router = express.Router()
const db = require('../queries')

router.get('/', db.getImages)

router.get('/:id', db.getImageById)

router.post('/', db.postImage)

module.exports = router