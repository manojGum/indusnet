const express = require('express')
const cors = require('cors')
const BodyParser=require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config();
const api=process.env.ApI_URL
// Controller 
const generateOTPController=require("./controllers/generateOtpController")
const OtpValidateController= require("./controllers/OtpValidateController")

const app=express();
// Middleware
app.use(express.json());
app.use(cors())
app.use(BodyParser.json());
app.use(cookieParser());
app.use(BodyParser.urlencoded({extended:true}))
// Routes
app.use(`${api}/generateOTP`,generateOTPController);
app.use(`${api}/OtpValidate`,OtpValidateController);






module.exports=app;