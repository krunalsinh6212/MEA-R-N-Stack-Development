const express = require('express');
const dbconnect = require('./dbconfig/dbconfig');
const app = express();

dbconnect();

require('dotenv').config();
const PORT = process.env.PORT;

// Form-data to JSON conversion
app.use(express.json()); // We can also use body-parser
app.use(express.urlencoded({ extended: true }));

// Map the course route
const courseRoute = require('./routes/courseRoutes');
app.use('/api/v1', courseRoute);

app.get('/', (req, res) => {
  res.send("Course server is running");
});

app.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT}`);
});
