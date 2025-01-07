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

// Middleware to pass viewsPath
app.use((req, res, next) => {
  req.viewsPath = viewsPath;
  next();
});

// Mount router
app.use('/api/v1', userRouter);

app.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT}`);
});
