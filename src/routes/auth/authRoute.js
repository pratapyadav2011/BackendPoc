const router = require("express").Router();
const { authController } = require("../../controllers");
const { verifyAccessToken } = require("../../middleware/auth");
const { loginValidation } = require("../../middleware/validations");
const { authRoute } = require("../routesConstant");

/*
  #swagger.start
  #swagger.auto = false
  #swagger.tags = ['Auth']
  #swagger.path = '/auth/login'
  #swagger.method = 'post'
  #swagger.description = 'user login'
  #swagger.parameters['Request'] = { 
                    in: 'body',
                    description: 'login',
                    type: 'object',
                    required: true,
                    schema: {                           
                      "userName": "string",
                      "password": "string"
                            }
                        }
                
  #swagger.produces = ["application/json"]
  #swagger.consumes = ["application/json"]
  #swagger.end
*/
router.post(authRoute.login, async (req, res) => {
  await loginValidation.validateAsync(req.body);
  const response = await authController.SignIn(req.body);
  res.send(response);
});

router.post(authRoute.signup, async (req, res) => {
  const response = await authController.SignUp(req.body);
  res.send(response);
});

router.get(authRoute.logout, verifyAccessToken, async (req, res) => {
  const response = await authController.SignOut(req);
  res.send(response);
});

router.get(authRoute.token, verifyAccessToken, async (req, res) => {
  const response = await authController.GetToken(req.body);
  res.send(response);
});

module.exports = router;
