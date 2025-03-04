const mongoose = require('mongoose');

require('dotenv').config()

const dbconnect = () => {
  mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Connection is successful!'))
    .catch((err) => {
      console.log('Error in db connection')
      console.error(err.message)
      process.exit(1)
    })
}

module.exports = dbconnect