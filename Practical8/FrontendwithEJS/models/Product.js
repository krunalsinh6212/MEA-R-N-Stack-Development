const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productid: {
    type: String,
    required: true,
    unique: true
  },
  productname: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema); 