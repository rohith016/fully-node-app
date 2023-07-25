require('dotenv').config(); // Load environment variables
const express = require('express');
const rateLimit = require('express-rate-limit');
const routes = require('./src/routes');
const productRoutes = require('./src/routes/productRoutes');
const connectDB = require('./src/config/db');
// const morgan = require('morgan');

const app = express();

// connect to the db
connectDB();

// app.use(morgan('combined')); // Use 'combined' log format

// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See 
// http://expressjs.com/api#app-settings for more details.
app.set('trust proxy', 1);


// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);


// Routes
app.use('/', routes);
app.use('/products', productRoutes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  const message = err.message || 'Something went wrong!';

  res.status(statusCode).json({
    status: status,
    message: message,
  });
});

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

module.exports = app; // for testing
