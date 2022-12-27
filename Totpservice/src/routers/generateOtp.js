const express = require("express");
const router = express.Router();
const loginAccountLimiter = require("../middlewares/loginAccountLimiter");
const generateOtpController = require("../controllers/generateOtpController");

/* http://localhost:8000/api/v1.0.0/otp/generateOTP */

/* In This Router and API are required user Email id and generate a 6 digits unique id and send that unique id to the userd provided email addres*/

/*
with the help of  middelware "loginAccountLimiter", it used to block the user some times Limit each IP 3  request send or  create account requests per `window` after that automatic block that ip some times according to we provided
 */

router.post("/", loginAccountLimiter, generateOtpController);

module.exports = router;
