const rateLimit = require("express-rate-limit");
const trackId = Math.floor(new Date());
const timestamp = new Date();

const loginAccountLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5, // Limit each IP to 5 create account requests per `window`
  message: async (req, res) => {
    return res.send({
      trackId,
      statusCode: 429,
      timestamp,
      message: "Too many requests, please try again late.",
    });
  },
  // 'Too many requests, please try again later',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = loginAccountLimiter;
