require('dotenv').config(); // Load environment variables
const express = require('express');
const routes = require('./src/routes');
const connectDB = require('./src/config/db');

const app = express();

// connect to the db
connectDB();

// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    error: {
      message: err.message,
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app; // for testing
