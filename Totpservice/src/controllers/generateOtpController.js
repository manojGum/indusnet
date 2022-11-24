const express = require('express');
const Generate = require("../models/generateOtpModel");
const Isemail = require('isemail');
const router = express.Router();
const transporter = require("../configs/mail")
const otpGenerator = require("otp-generator");
const crypto       = require("crypto");
require('dotenv').config()
const loginAccountLimiter=require("../middlewares/loginAccountLimiter")





// Generate a 6 digit numeric OTP
const createNewOTP=(email)=>{
    const otp      = otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets:false,specialChars:false});
    const ttl      =(60 * 1000); 
    const expires  = Date.now() + ttl;
    const data     = `${email}.${otp}.${expires}`;
    const hash     = crypto.createHmac("sha256",process.env.key).update(data).digest("hex"); // creating SHA256 hash of the data
    const token = `${hash}.${expires}`; 
    return { token,otp};
}


router.post("/",loginAccountLimiter, async (req,res,next)=>{

    
    let user = await req.body
    const  trackId=Math.floor(new Date())
    const timestamp=new Date(),
     email = (user.email || '').trim()
    if (email.length===0) {
        return res.status(401).send({trackId,statusCode:400,timestamp,message:'Email not provided'})
        // throw new Error("Email i salready taken")
        }
    const valid= Isemail.validate(email)
    if(!valid){
        return res.status(400).send({trackId,statusCode:400,timestamp,message:"Enter valid Email"})
    }
    try{


        const {token, otp}=await createNewOTP(email)
        res.cookie("jwttoken",token,{
            expires:new Date(Date.now()+(1000*60)),
            httpOnly:true
        })
    


        // const mailOptions = {
        //     from: '"Manoj kumar Admin 👻" <admin@manojkumar.com>', // sender address
        //     to: user.email, // list of receivers
        //     subject: "your Otp is successfully send ✔ ", // Subject line
        //     text: `Hello sir/madam your otp is ${otp}`, // plain text body
        //     html: `<b>Hello sir/madam your otp is ${otp}</b>`, // html body
        // }
        // {
        //     from: `"Manoj kumar"<${process.env.EMAIL_ADDRESS}>`,
        //     to: `${email}`,
        //     subject: email_subject,
        //     text: email_message ,
        //   };


        // await transporter.sendMail(mailOptions, async (err, res) => {
        //     if (err) {
        //         return res.status(400).send({"Status":"Failure","Details": err });
        //     } else {
        //     //   return res.send({"Status":"Success","Details":encoded});
        //     user= await Generate.create(req.body);
        //       return res.status(201).send({user,token,message:"OTP  successfully  send in your Email, it will expire in 5 minutes"})
        //     }
        //   });

        
        //    const otp= Math.random().toString().substring(2, 8);
        //   const generate=await Generate.create(req.body);
        // email send 
        // transporter.sendMail({
        //     from: '"Manojgum Admin 👻" <admin@manojkumar.com>', // sender address
        //     to: user.email, // list of receivers
        //     subject: "your Otp is successfully send ✔ ", // Subject line
        //     text: `Hello sir/madam your otp is ${otp}`, // plain text body
        //     html: `<b>Hello sir/madam your otp is ${otp}</b>`, // html body
        // });
        // return res.status(201).send({message: "OTP  successfully  send in your Email "})
        // user= await User.create(req.body);
        
        // user= await Generate.create(req.body);
       const details={
            "timestamp":timestamp, 
            "TraceID":trackId,
            "Email": email,
            "token": token,
            "success": true,
            "statusCode":200,
            "message":"OTP  successfully  send in your Email, it will expire in 5 minutes",
            "otp":otp
            
        }
        return res.status(200).send(details)
        // return res.status(201).send({user,token,message:"OTP  successfully  send in your Email, it will expire in 5 minutes"})
    }catch(err){
    const  trackId=Math.floor(new Date())
        return res.status(500).send({trackId,statusCode:500,timestamp,message:err.message})
    }
})

module.exports=router