const router = require("express").Router();
const { homeController } = require("../controllers");
const { homeRoute } = require("./routesConstant");
const { apiLimiter } = require("../middleware/rateLimiter");

/*
  #swagger.start
  #swagger.auto = false
  #swagger.tags = ['homepage']
  #swagger.path = '/home'
  #swagger.method = 'Get'
  #swagger.description = 'home screen data'
  #swagger.produces = ["application/json"]
  #swagger.consumes = ["application/json"]
  #swagger.end
*/
router.get(homeRoute.home, apiLimiter, async (req, res) => {
  const response = await homeController.Home();
  res.send(response);
});

module.exports = router;
