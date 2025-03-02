const db = require("../models");
const Product = db.products;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Title cannot be empty!" });
    return;
  }

  // Validate price
  if (req.body.price !== undefined && (isNaN(req.body.price) || req.body.price < 0)) {
    res.status(400).send({ message: "Price must be a non-negative number!" });
    return;
  }

  // Create a Product
  const product = new Product({
    title: req.body.title,
    price: req.body.price || 0,
    published: req.body.published ? req.body.published : false
  });

  // Save Product in the database
  product
    .save()
    .then(data => {
      console.log("Product saved successfully:", data);
      res.send(data);
    })
    .catch(err => {
      console.error("Error saving product:", err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Product.find(condition)
    .then(data => {
      console.log("Products found:", data);
      res.send(data);
    })
    .catch(err => {
      console.error("Error finding products:", err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products."
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then(data => {
      if (!data) {
        console.log("Product not found with id:", id);
        res.status(404).send({ message: "Not found Product with id " + id });
      } else {
        console.log("Product found:", data);
        res.send(data);
      }
    })
    .catch(err => {
      console.error("Error finding product:", err);
      res.status(500).send({ message: "Error retrieving Product with id=" + id });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  // Validate price if it's being updated
  if (req.body.price !== undefined && (isNaN(req.body.price) || req.body.price < 0)) {
    return res.status(400).send({
      message: "Price must be a non-negative number!"
    });
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then(data => {
      if (!data) {
        console.log("Cannot update Product with id:", id);
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`
        });
      } else {
        console.log("Product updated successfully:", data);
        res.send({ message: "Product was updated successfully.", data: data });
      }
    })
    .catch(err => {
      console.error("Error updating product:", err);
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        console.log("Cannot delete Product with id:", id);
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      } else {
        console.log("Product deleted successfully:", data);
        res.send({
          message: "Product was deleted successfully!"
        });
      }
    })
    .catch(err => {
      console.error("Error deleting product:", err);
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.deleteMany({})
    .then(data => {
      console.log("All products deleted:", data);
      res.send({
        message: `${data.deletedCount} Products were deleted successfully!`
      });
    })
    .catch(err => {
      console.error("Error deleting all products:", err);
      res.status(500).send({
        message: err.message || "Some error occurred while removing all products."
      });
    });
};

// Find all published Products
exports.findAllPublished = (req, res) => {
  Product.find({ published: true })
    .then(data => {
      console.log("Published products found:", data);
      res.send(data);
    })
    .catch(err => {
      console.error("Error finding published products:", err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products."
      });
    });
};
