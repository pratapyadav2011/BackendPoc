const Joi = require("joi");

// LOGIN validation
const loginValidation = Joi.object({
  userName: Joi.string().min(2).required().error(new Error("Invalid username")),
  password: Joi.string().min(2).required().error(new Error("Invalid Password")),
});

module.exports = {
  loginValidation,
};
