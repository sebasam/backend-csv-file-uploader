const mongoose = require('mongoose')
const mongo_url = process.env.MONGO_URL

const dataBaseConnection = async() => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database connected!')
    } catch(error){
        console.log(error)
    }
}

module.exports = dataBaseConnection