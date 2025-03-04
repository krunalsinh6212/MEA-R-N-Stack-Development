const express = require('express');
const path = require('path');
const userRouter = require('./routes/userRoutes');

const app = express();

const dbconnect = require('./dbconfig/dbconfig');
dbconnect();

require('dotenv').config();
const PORT = process.env.PORT;

const viewsPath = path.join(__dirname, '/views/');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the views directory
app.use(express.static(viewsPath));

// Middleware to pass viewsPath
app.use((req, res, next) => {
  req.viewsPath = viewsPath;
  next();
});

// Root route
app.get('/', (req, res) => {
  res.redirect('/api/v1/login');
});

// Direct login route
app.get('/login', (req, res) => {
  res.redirect('/api/v1/login');
});

// Direct signup route
app.get('/signup', (req, res) => {
  res.redirect('/api/v1/signup');
});

// Direct features routes (handle both with and without .html)
app.get('/features', (req, res) => {
  res.redirect('/api/v1/features');
});

app.get('/features.html', (req, res) => {
  res.redirect('/api/v1/features');
});

// Mount router
app.use('/api/v1', userRouter);

// Handle .html extension in api routes
app.use('/api/v1', (req, res, next) => {
  if (req.path.endsWith('.html')) {
    const newPath = req.path.slice(0, -5); // remove .html
    res.redirect(307, `/api/v1${newPath}`);
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT}`);
});
