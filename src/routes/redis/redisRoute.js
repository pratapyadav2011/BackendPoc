const router = require("express").Router();
const { redisController } = require("../../controllers");
const { redisRoute } = require("../routesConstant");

router.get(redisRoute.redisExample, async (req, res) => {
  const response = await redisController.RedisExample();
  res.send(response);
});

module.exports = router;
