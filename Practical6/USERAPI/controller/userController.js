const path = require("path");
const user = require("../model/user");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      console.log('All fields are required!');
      return res.status(400).send('All fields are required!');
    }

    // Check if the user already exists
    const checkuser = await user.find({ email });
    if (checkuser.length === 0) {
      const newuser = { username, email, password };
      await user.create(newuser);
      res.sendFile(path.join(req.viewsPath, "home.html"));
    } else {
      console.log('User already exists!');
      res.status(409).send('User already exists!');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Email and password are required!');
      return res.status(400).send('Email and password are required!');
    }

    // Check if the user exists
    const checkuser = await user.findOne({ email });
    if (checkuser) {
      if (checkuser.password === password) {
        console.log('Login successful!');
        res.sendFile(path.join(req.viewsPath, "home.html"));
      } else {
        console.log('Incorrect password!');
        res.status(401).send('Incorrect password!');
      }
    } else {
      console.log('User does not exist!');
      res.status(404).send('User does not exist!');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
