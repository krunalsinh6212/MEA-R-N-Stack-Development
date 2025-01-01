const { config } = require('dotenv')
const express = require('express')
const app = express()

const customer = require('./model/customer')
const dbconfig = require('./dbconfig/dbconfig')

require('dotenv'), config();
const PORT = process.env.PORT

const newCustomer = new customer({
  custid: 1, custName: "Krunalsinh Chhasatiya", custCity: "Bharuch"
});

newCustomer.save()
  .then(() => console.log("Customer Saved"))
  .catch((err) => console.log(err))

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
