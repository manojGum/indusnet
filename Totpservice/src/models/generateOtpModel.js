const mongoose = require("mongoose");
const generateOtpSchema = new mongoose.Schema(
  {
    userName: { type: String, required: false },
    email: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const generate = mongoose.model("generateOtp", generateOtpSchema);
module.exports = generate;
