const { Schema, model } = require("mongoose");
/**
 * @typedef {Object} OTP
 * @property {string} [code] - The One-Time Password (OTP) code. Optional and defaults to `undefined`.
 * @property {Date} [expiresAt] - The expiration date/time of the OTP. Optional.
 */
const OTPSchema = new Schema({
  code: { type: String, required: false, default: undefined },
  expiresAt: { type: Date, required: false },
});

const UserSchema = new Schema(
  {
    userName: { type: String, required: false },
    mobile: { type: String, unique: true, required: true },
    otp: { type: OTPSchema },
    verifiedMobile: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);

module.exports = UserModel;
