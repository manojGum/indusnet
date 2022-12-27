const nodemailer = require("nodemailer");
require("dotenv").config();

// mail configration
// let transporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "75f72ecb947a2d", // generated ethereal user
//       pass: "5a01a36b4742f2", // generated ethereal password
//     },
//   });

//   module.exports transporter

// mail transporter  and configration Smtp user passowrd and servece provider configs

module.exports = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.em, // generated ethereal user
    pass: process.env.pss, // generated ethereal password
  },
});
process.env.ApI_URL;
