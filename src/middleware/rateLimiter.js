const { rateLimit } = require("express-rate-limit");

const WINDOW_SIZE = 60 * 1000;
const MESSAGE = "Too Many hits";

const apiLimiter = rateLimit({
  windowMs: WINDOW_SIZE, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: MESSAGE,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
  apiLimiter,
};
