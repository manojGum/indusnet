const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const api = process.env.ApI_URL;
// Controller
const generateOtp = require("./routers/generateOtp");
const OtpValidate = require("./routers/otpValidate");

const app = express();
// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// with the help of this middelware , we decide which router to send  according to the  user request.
app.use(`${api}/generateotp`, generateOtp);
app.use(`${api}/Otpvalidate`, OtpValidate);

module.exports = app;
