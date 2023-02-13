const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const api = require('./routes/api.routes')
const path = require('path')

dotenv.config()

const port = process.env.PORT
const dataBaseConnection = require('./config/config')
dataBaseConnection()

app.use(express.static('/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/', api)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(port, () => {
    console.log(`Server is running on port ${ port }`)
})