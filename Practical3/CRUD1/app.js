const { config } = require('dotenv')
const express = require('express')
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const customer = require('./model/customer')
const dbconfig = require('./dbconfig/dbconfig')

// Create a new customer
const addCustomer = async () => {
  try {
    const newCustomer = new customer({
      custid: 2,
      custName: "Mohit Jobanputra",
      custCity: "Surat"
    });
    await newCustomer.save();
    console.log("New customer added successfully!");
  } catch (error) {
    console.log("Error adding customer:", error.message);
  }
}

// Call the function to add the customer
addCustomer();

require('dotenv').config()
const PORT = process.env.PORT

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Customer API' })
})

// Create a new customer
app.post('/api/customers', async (req, res) => {
  try {
    const newCustomer = new customer({
      custid: req.body.custid,
      custName: req.body.custName,
      custCity: req.body.custCity
    })
    const savedCustomer = await newCustomer.save()
    res.status(201).json(savedCustomer)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all customers
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await customer.find()
    res.json(customers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a single customer by ID
app.get('/api/customers/:custid', async (req, res) => {
  try {
    const foundCustomer = await customer.findOne({ custid: req.params.custid })
    if (!foundCustomer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.json(foundCustomer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update a customer
app.put('/api/customers/:custid', async (req, res) => {
  try {
    const updatedCustomer = await customer.findOneAndUpdate(
      { custid: req.params.custid },
      {
        custName: req.body.custName,
        custCity: req.body.custCity
      },
      { new: true }
    )
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.json(updatedCustomer)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete a customer
app.delete('/api/customers/:custid', async (req, res) => {
  try {
    const deletedCustomer = await customer.findOneAndDelete({ custid: req.params.custid })
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.json({ message: 'Customer deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
