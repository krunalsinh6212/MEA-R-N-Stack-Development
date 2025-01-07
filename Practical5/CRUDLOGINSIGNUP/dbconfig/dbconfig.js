const mongoose = require('mongoose')

require('dotenv').config()

const dbconnect = () => {
    mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log('Connection is successed!'))
    .catch((err)=>{
        console.log('Error in db connection')
        console.error(err.message)
        process.exit(0)
    })
}

module.exports = dbconnect