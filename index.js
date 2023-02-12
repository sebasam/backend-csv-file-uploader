const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const api = require('./routes/api.routes')

dotenv.config()

const port = process.env.PORT
const dataBaseConnection = require('./config/config')
dataBaseConnection()

app.use(express.static('/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/', api)

app.listen(port, () => {
    console.log(`Server is running on port ${ port }`)
})