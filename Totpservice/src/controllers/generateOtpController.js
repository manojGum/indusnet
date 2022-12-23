const express = require('express');
var path = require('path');
var fs = require('fs');
const Generate = require("../models/generateOtpModel");
const Isemail = require('isemail');
const router = express.Router();
const transporter = require("../configs/mail")
// const otpGenerator = require("otp-generator");
const crypto  = require("crypto");
require('dotenv').config()

// Generate a 6 digit numeric OTP
 function generateOTP() {
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }


const createNewOTP=async(email)=>{
   
      
    const otp= await generateOTP() 
    const ttl      =(60 * 1000); 
    const expires  = Date.now() + ttl;
    const data     = `${email}.${otp}.${expires}`;
    const hash     = crypto.createHmac("sha256",process.env.key).update(data).digest("hex"); // creating SHA256 hash of the data // Number representations "hex"
    const token = `${hash}.${expires}`; 
    return { token,otp};
}

//http://localhost:8000/api/v1.0.0/otp/generateOTP

const generateotpcont=async (req,res,next)=>{

    // request user details
    let user = await req.body
    const  trackId=Math.floor(new Date())
    const timestamp=new Date(),
     email = (user.email || '').trim()
    if (email.length===0) {
        return res.status(401).send({trackId,statusCode:400,timestamp,message:'Email not provided',path:__filename})
        // throw new Error("Email not provided")
        }
    const valid= Isemail.validate(email)
    if(!valid){
        return res.status(400).send({trackId,statusCode:400,timestamp,message:"Enter valid Email",path:__filename})
    }
    try{
        // otp and token generation request
        const {token, otp}=await createNewOTP(email)
        res.cookie("jwttoken",token,{
            expires:new Date(Date.now()+(1000*60)),
            httpOnly:true
        })
    

        // Email sends to the user 
        transporter.sendMail({
            from: '"Admin 👻" <admin@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "your Otp is successfully send ✔ ", // Subject line
            text: `Hello sir/madam your otp is ${otp}`, // plain text body
            html: `<b>Hello sir/madam your otp is ${otp}</b>`, // html body
        });
        return res.status(201).send({message: `We have successfully send OTP in your register email_ID - ${email}, it will expire in 1 minutes `})
     
    }catch(err){
        return res.status(500).send({trackId,statusCode:500,timestamp,message:err.message,path:__filename})
    }
}

module.exports=generateotpcont