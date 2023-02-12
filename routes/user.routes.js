const express = require('express')
const router = express.Router()
const { validateFields } = require('./../middlewares/validationResult')
const { users } = require('./../middlewares/validationBody')
const { createUser, loginUser } = require('./../controllers/userController')

router.post('/register', users, validateFields, createUser)

router.post('/login', loginUser)

module.exports = router