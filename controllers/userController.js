const User = require('./../models/User')
const bcrypt = require('bcrypt')
const { generateToken } = require('./../helpers/jwtGenerate')

const createUser = async(req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if(user){
            return res.status(400).json({
                msg: 'Email is already exist!'
            })
        }

        const dbUser = new User({
            email: email,
            password: password
        })

        const salt = bcrypt.genSaltSync()
        dbUser.password = bcrypt.hashSync( password, salt )

        await dbUser.save()

        return res.status(200).json({
            ok: true,
            id: dbUser.id,
            email: dbUser.email,
            password: dbUser.password
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Please contact to support!!'
        })
    }
}

const loginUser = async(req, res) => {
    const { email, password } = req.body
    try {
        const dbUser = await User.findOne({ email })
        if(!dbUser) return res.status(400).json({
            ok: false,
            msg: 'Email is not valid!'
        })

        const validatePassword = bcrypt.compareSync(password, dbUser.password)
        if(!validatePassword) return res.status(400).json({
            ok: false,
            msg: 'Password not valid!!'
        })
        const token = await generateToken(dbUser._id, dbUser.name)

        return res.status(200).json({
            ok: true,
            msg: 'Welcome!!',
            id: dbUser._id,
            email,
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error',
            error
        })
    }
}

const validateJWT = async(req, res) => {
    const { id } = req
    const dbUser = await User.findById(id)
    const token = await generateToken(id, dbUser.name)

    return res.json({
        ok: true,
        id,
        name: dbUser.name,
        email: dbUser.email,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    validateJWT
}