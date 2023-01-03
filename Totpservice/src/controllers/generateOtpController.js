const fs = require("fs");
const isEmail = require("isemail");
const transporter = require("../configs/mail");
const crypto = require("crypto");
require("dotenv").config();

// Generate a random  6 digit numeric OTP
function generateOtp() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

const createNewOtp = async (email) => {
  const otp = await generateOtp();
  const ttl = 5 * (60 * 1000);
  const expires = Date.now() + ttl;
  // Calculate new hash with the help of   key , data and  the  algorithm
  const data = `${email}.${otp}.${expires}`;
  const hash = crypto
    .createHmac("sha256", process.env.key)
    .update(data)
    .digest("hex"); // creating SHA256 hash of the data // Number representations "hex"
  const token = `${hash}.${expires}`;
  return { token, otp };
};

const generateOtpController = async (req, res, next) => {
  // request user details
  let user = await req.body; // get username and email id  from body
  const trackId = Math.floor(new Date()); // Generate trackId used of current date and time 
  const timestamp = new Date() ;
  const   email = (user.email || "").trim(); // remove unwanted space between user email Id
  if (email.length === 0) {
    // check email length is equal to zero then through an error email not provided
    return res.status(401).send({
      trackId,
      statusCode: 400,
      timestamp,
      message: "Email not provided",
      path: __filename,
    });
    // throw new Error("Email not provided")
  }
  const valid = isEmail.validate(email);
  if (!valid) {
    return res.status(400).send({
      trackId,
      statusCode: 400,
      timestamp,
      message: "Enter valid Email",
      path: __filename,
    });
  }
  try {
    // Otp and token generating  request send to the createnewOtp function
    const { token, otp } = await createNewOtp(email);
    // Save Token in Cookie Storage
    res.cookie("jwttoken", token, {
      expires: new Date(Date.now() + 5 * (60 * 1000)),
      httpOnly: true,
    });

    // Email sends to the user
    transporter.sendMail({
      from: '"Admin 👻" <admin@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "your Otp is successfully send ✔ ", // Subject line that is send to the user
      text: `Hello sir/madam your otp is ${otp}`, // plain text body message 
      html: `<b>Hello sir/madam your otp is ${otp}</b>`, // html body message to send user
    });
    return res.status(201).send({
      message: `We have successfully send OTP in your register email_ID - ${email}, it will expire in 5 minutes `,
    });
  } catch (err) {
    return res.status(500).send({
      trackId,
      statusCode: 500,
      timestamp,
      message: err.message,
      path: __filename,
    });
  }
};

module.exports = generateOtpController;
