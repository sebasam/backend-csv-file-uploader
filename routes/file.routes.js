const express = require('express')
const router = express.Router()
const upload = require('./../middlewares/upload')
const { createFile, getFiles, getFileById, deleteFileById } = require('./../controllers/fileController')

router.post('/upload', upload.single('file'), createFile)

router.get('/files', getFiles)

router.get('/files/:id', getFileById)

router.delete('/delete/:id', deleteFileById)

module.exports = router