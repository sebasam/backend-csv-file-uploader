const express = require('express')
const router = express.Router()
const file = require('./file.routes')
const user = require('./user.routes')

router.use('/api', file)
router.use('/api', user)

module.exports = router