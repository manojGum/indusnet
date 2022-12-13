const nodemailer = require("nodemailer");

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
module.exports= nodemailer.createTransport({
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: "manojgum@gmail.com", // generated ethereal user
      pass: "lnrsvfdmvgovyjyg", // generated ethereal password
    },
  });