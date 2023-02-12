const express = require('express')
const router = express.Router()
const file = require('./file.routes')

router.use('/api', file)

module.exports = router