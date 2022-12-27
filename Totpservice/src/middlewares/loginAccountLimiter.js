const rateLimit = require("express-rate-limit");
const trackId = Math.floor(new Date());
const timestamp = new Date();

const loginAccountLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // Her we set time in minutes how logn block ip after automatic unblock
  max: 3, /* Limit each IP to 5 times request send or  create account requests per `window` after that automatic block that ip some times according to we provided */
  message: async (req, res) => {
    return res.status(429).send({
      trackId,
      statusCode: 429,
      timestamp,
      message: "Too many requests, please try again late.",
    });
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = loginAccountLimiter;
