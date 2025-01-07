const express = require("express");
const userctlr = require("../controller/userController");
const path = require("path")

const router = express.Router();

// GET route for rendering login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(req.viewsPath, "login.html"));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(req.viewsPath, "signup.html"));
});

// Existing POST routes
router.post('/signup', userctlr.signup);
router.post('/login', userctlr.login);

module.exports = router;
