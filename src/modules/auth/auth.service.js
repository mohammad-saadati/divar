const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { randomInt } = require("crypto");
const UserModel = require("../user/user.model");
const { AuthMessages } = require("./auth.messages");

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
  async checkOTP(mobile, code) {}
  async checkUserExist(mobile) {
    const user = await this.#model.findOne({ mobile });
    if (!user) throw new createHttpError.NotFound(AuthMessages.USER_NOT_FOUND);
    return user;
  }
}

module.exports = new AuthService();
