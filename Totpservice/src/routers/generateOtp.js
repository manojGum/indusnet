const express = require("express");
const router = express.Router();

const loginAccountLimiter = require("../middlewares/loginAccountLimiter");
const generateotpcont = require("../controllers/generateOtpController");

// //http://localhost:8000/api/v1.0.0/otp/generateOTP

// generate otp

router.post("/", loginAccountLimiter, generateotpcont);

module.exports = router;
