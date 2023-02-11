const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORT

app.use(express.static('/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.listen(port, () => {
    console.log(`Server is running on port ${ port }`)
})