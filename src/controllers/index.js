module.exports = {
  homeController: require("./homeController"),
  authController: require("./auth/authController"),
  redisController: require("./redis/redisController"),
  pgController: require("./postgres/pgController"),
  mongoDbController: require("./mongoDb/mongoDbController"),
  upaController: require("./upa/upaController"),
};
