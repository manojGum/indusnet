const express = require("express");
const cors = require("cors");
const BodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const api = process.env.ApI_URL;
// Controller
const generateOTP = require("./routers/generateOtp");
const OtpValidate = require("./routers/otpValidate");

const app = express();
// Middleware
app.use(express.json());
app.use(cors());
app.use(BodyParser.json());
app.use(cookieParser());
app.use(BodyParser.urlencoded({ extended: true }));
// Routes
app.use(`${api}/generateOTP`, generateOTP);
app.use(`${api}/OtpValidate`, OtpValidate);

module.exports = app;
