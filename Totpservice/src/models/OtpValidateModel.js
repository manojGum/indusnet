const mongoose = require("mongoose");
const OtpValidateSchema = new mongoose.Schema(
  {
    otp: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const OtpValidate = mongoose.model("generateOtp", OtpValidateSchema);
module.exports = OtpValidate;
