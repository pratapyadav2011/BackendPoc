const router = require("express").Router();
const { upaController } = require("../../controllers");

router.post("/add-user", async (req, res) => {
  const response = await upaController.addUser(req);
  res.send(response);
});

router.post("/add-domain", async (req, res) => {
  const response = await upaController.addDomain(req);
  res.send(response);
});

router.post("/add-feature", async (req, res) => {
  const response = await upaController.addFeature(req);
  res.send(response);
});

// router.post("/add-wishlist", async (req, res) => {
//   const response = await upaController.addWishlist(req);
//   res.send(response);
// });

router.post("/add-scenario", async (req, res) => {
  const response = await upaController.addScenario(req);
  res.send(response);
});

router.post("/add-event", async (req, res) => {
  const response = await upaController.addEvent(req);
  res.send(response);
});

router.post("/subs-feature", async (req, res) => {
  const response = await upaController.subscribeFeature(req);
  res.send(response);
});

router.post("/store-fb-token", async (req, res) => {
  try {
    const response = upaController.storeFirebaseToken(req);
    res.send(response);
  } catch (e) {
    res.send(response);
  }
});

router.post("/send-notifications", async (req, res) => {
  try {
    const response = await upaController.sendFirebaseMessage(req);
    res.send(response);
  } catch (e) {
    res.statusCode = 400;
    res.send(e);
  }
});

module.exports = router;
