const express = require('express');
const path = require('path');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
app.use(express.json()); //the data from the body is added to the req as an object

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, '/public')));

//this middleware will aplly to every request
app.use((req, res, next) => {
  console.log('Hello from the middleware..! ✌');
  next();
});

app.use((req, res, next) => {
  //adding som var to the req bundle
  req.requestTime = new Date().toISOString();
  next();
});
// ROUTE
//Mounting different routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
