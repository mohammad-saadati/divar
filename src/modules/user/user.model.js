const { Schema, model } = require("mongoose");

const OTPSchema = new Schema({
  code: { type: String, required: false, default: undefined },
  expiresAt: { type: Date, required: false },
});

const UserSchema = new Schema(
  {
    userName: { type: String, required: false },
    mobile: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    otp: { type: OTPSchema },
    verifiedMobile: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);

module.exports = UserModel;
