module.exports = {
  homeRoute: require('./homeRoute'),
  authRoute: require('./auth/authRoute'),
  pgRoute: require('./postgres/pgRoute'),
  redisRoute: require('./redis/redisRoute'),
  mongoRoute: require('./mongoDb/mongoRoute'),
  upaRoute: require('./upa/upaRoute'),
};
