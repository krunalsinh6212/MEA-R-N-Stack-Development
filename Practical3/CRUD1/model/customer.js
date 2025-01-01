const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  custid: {
    type: Number,
    require: true,
  },
  custName: {
    type: String,
    require: true,
  },
  custCity: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model("customer", customerSchema);