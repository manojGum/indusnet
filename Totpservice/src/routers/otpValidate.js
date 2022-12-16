const express = require('express')

// const OtpValidate = require('../models/OtpValidateModel');
const router=express.Router();

const Authenticate = require("../middlewares/authenticate")

const otpValidate = require('../controllers/OtpValidateController')


router.post("/",Authenticate,otpValidate)




module.exports=router