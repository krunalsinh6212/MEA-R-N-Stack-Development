const express = require('express');
const dbconnect = require('./dbconfig/dbconfig');
const cookieParser = require('cookie-parser');
const path = require('path');
const { isAuthenticated } = require('./middleware/auth');
const app = express();

dbconnect();

require('dotenv').config();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('views'));

// Routes
const authRoutes = require('./routes/authRoutes');
const courseRoute = require('./routes/courseRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/courses', isAuthenticated, courseRoute);

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT}`);
});
