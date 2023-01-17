const router = require("express").Router();
const { pgController } = require("../../controllers");
const { pgRoute } = require("../routesConstant");

router.get(pgRoute.pgExample, async (req, res) => {
  const response = await pgController.PGExample();
  res.send(response);
});

module.exports = router;
