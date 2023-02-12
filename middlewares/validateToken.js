const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const token = req.header('x-token')
    if(!token) return res.status(401).json({
        ok: false,
        msg: 'Token is not valid'
    })
    try {
        const { id, name } = jwt.verify(token, process.env.SECRET_KEY)
        req.id = id
        req.name = name
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'There are any problem with token, it doesnt exist or incorrect sign'
        })
    }
    next()
}

module.exports = { validateToken }