const express = require('express')
const router = express.Router()
const upload = require('./../middlewares/upload')
const { createFile } = require('./../controllers/fileController')

router.post('/upload', upload.single('file'), createFile)

module.exports = router