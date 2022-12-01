const express = require('express')
const cors = require('cors')
const BodyParser=require('body-parser')
const cookieParser = require('cookie-parser')
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
app.use("/api/v16.17.0/otp/generateOTP",generateOTPController);
app.use("/api/v16.17.0/otp/OtpValidate",OtpValidateController)






module.exports=app;