const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { randomInt } = require("crypto");
const jwt = require("jsonwebtoken");
const UserModel = require("../user/user.model");
const { AuthMessages } = require("./auth.messages");
// const dotenv = require("dotenv");

// dotenv.config();

class AuthService {
  #model;

  constructor() {
    this.#model = UserModel;
    autoBind(this);
  }

  async sendOTP(mobile) {
    const user = await this.#model.findOne({ mobile });
    const now = new Date().getTime();
    const otp = {
      code: randomInt(10000, 99999),
      expiresAt: now + 2 * 60 * 1000,
    };

    if (!user) {
      const newUser = this.#model.create({ mobile, otp });
      return newUser;
    }

    if (user.otp && user.otp.expiresAt > now)
      throw new createHttpError.BadRequest(AuthMessages.OTP_CODE_NOT_EXPIRED);

    user.otp = otp;
    await user.save();
  }
  async checkOTP(mobile, code) {
    const user = await this.checkUserExist(mobile);
    const now = new Date().getTime();

    if (user.otp.expiresAt < now)
      throw new createHttpError.Unauthorized(AuthMessages.OTP_CODE_NEXPIRED);
    if (user.otp.code !== code)
      throw new createHttpError.Unauthorized(AuthMessages.INVALID_CODE);

    if (!user.verifiedMobile) {
      user.verifiedMobile = true;
      await user.save();
    }

    const accessToken = this.signToken({ mobile, userId: user._id });
    return accessToken;
  }
  async checkUserExist(mobile) {
    const user = await this.#model.findOne({ mobile });
    if (!user) throw new createHttpError.NotFound(AuthMessages.USER_NOT_FOUND);
    return user;
  }
  signToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return token;
  }
}

module.exports = new AuthService();
