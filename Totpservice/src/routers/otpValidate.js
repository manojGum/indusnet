const express = require("express");

const router = express.Router();

const Authenticate = require("../middlewares/authenticate");

const OtpValidateController = require("../controllers/otpValidateController");

// With the help of this Api  or Router , We validate the user and Whatever the OTP  entered user

router.post("/", Authenticate, OtpValidateController);

module.exports = router;
