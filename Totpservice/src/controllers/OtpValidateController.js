const crypto = require("crypto");
const Isemail = require("isemail");
require("dotenv").config();

function verifyOtp(email, token, otp) {
  // Seperate Hash value and expires from the hash returned from the user
  let [hashValue, expires] = token.split(".");
  // Check if expiry time has passed
  let now = Date.now();
  if (now > parseInt(expires)) return "Otp Expired";
  // Calculate new hash with the same key and the same algorithm
  let data = `${email}.${otp}.${expires}`;
  let newCalculatedHash = crypto
    .createHmac("sha256", process.env.key)
    .update(data)
    .digest("hex");
  // Match the hashes
  if (newCalculatedHash === hashValue) {
    return true;
  }
  return "Invalid OTP";
}

/* With the help of this controller , We will validate the OTP entered by the user , Wether the user has entered the correct OTP or not , If he enters
the correct OTP , we will check time is less then or equla to provied time then We will forward them or success message send, If the user enters wrong OTP then we will tell him your otp is wrong or alredy used  */

const OtpValidateController = async (req, res, next) => {
  const trackId = Math.floor(new Date());
  const timestamp = new Date();
  let { otp, email } = await req.body;
  if (!email) {
    return res.status(401).send({
      trackId,
      statusCode: 401,
      timestamp,
      message: "Email not provided",
    });
  }
  const valid = Isemail.validate(email);
  if (!valid) {
    return res.status(400).send({
      trackId,
      statusCode: 400,
      timestamp,
      message: "Enter valid Email",
    });
  }

  otp = (otp || "").trim();
  if (otp.length < 6) {
    return res.status(411).send({
      trackId,
      statusCode: 411,
      timestamp,
      message: "Enter 6 digit verification code",
    });
  }

  try {
    const token = await req.token;
    const tokenValidates = await verifyOtp(email, token, otp);
    if (tokenValidates === "Otp Expired") {
      return res.status(408).send({
        trackId,
        statusCode: 408,
        timestamp,
        message: "The submitted one-time password is not valid or Expired",
        path: __filename,
      });
    } else if (tokenValidates == "Invalid OTP") {
      return res.status(409).send({
        trackId,
        statusCode: 409,
        timestamp,
        message: "The submitted one-time password or email is not valid",
        path: __filename,
      });
    } else if (tokenValidates) {
      const user = {
        trackId: trackId,
        email: email,
        message: "successfully Login",
      };
      res.cookie("jwttoken", "");
      return res.status(200).send({ user, statusCode: 200, timestamp });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = OtpValidateController;
