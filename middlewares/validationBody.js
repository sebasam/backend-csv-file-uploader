const { body } = require('express-validator')

const users = [
    body('email', 'Email is required').normalizeEmail().not().isEmpty(),
    body('email', 'Email is invalid').normalizeEmail().isEmail(),
    body('password', 'The password must contain uppercase, lowercase, numbers and a special character').isStrongPassword()
]

module.exports = { users }