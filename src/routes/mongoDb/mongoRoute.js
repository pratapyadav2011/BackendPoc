const router = require("express").Router();
const { mongoDbController } = require("../../controllers");
const { mongoRoute } = require("../routesConstant");

router.get(mongoRoute.mongoExample, async (req, res) => {
  const response = await mongoDbController.MongoExample();
  res.send(response);
});

module.exports = router;
