require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const responseTime = require('response-time');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');
const seedData = require('./src/util/seedData');
const {
  homeRoute,
  authRoute,
  pgRoute,
  redisRoute,
  upaRoute,
  mongoRoute,
} = require('./src/routes');
const { MESSAGE } = require('./src/constants/constants');
const { ErrorMessage, NOT_FOUND_ERROR } = require('./src/constants/error');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(responseTime());
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));

app.use('/api', homeRoute);
// app.use("/api", pgRoute);
// app.use("/api", redisRoute);
// app.use("/api/auth", authRoute);
// app.use("/api", mongoRoute);
app.use('/api', upaRoute);

// swagger route
app.use(
  '/doc',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    explorer: true,
  })
);

app.use(async (req, res, next) => {
  next(NOT_FOUND_ERROR(ErrorMessage.API_NOT_FOUND));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.send({
    message: err.message,
  });
});

app.listen({ port: process.env.PORT }, () => {
  console.log(MESSAGE.SERVER_MSG + process.env.PORT);
});

module.exports = app;
