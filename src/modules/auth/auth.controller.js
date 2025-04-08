const authService = require("./auth.service");
const autoBind = require("auto-bind");
const { AuthMessages } = require("./auth.messages");
const NodeEnv = require("../../common/constant/env.enum");
const CookieNames = require("../../common/constant/cookie.enum");

class AuthController {
  #service;

  constructor() {
    this.#service = authService;
    autoBind(this);
  }

  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.#service.sendOTP(mobile);
      return res.json({
        message: AuthMessages.SEND_OTP_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const accessToken = await this.#service.checkOTP(mobile, code);

      return res
        .cookie("access_token", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === NodeEnv.PRODUCTION,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .status(200)
        .json({
          message: AuthMessages.LOGIN_SUCCESS,
          token: accessToken,
        });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      return res
        .clearCookie(CookieNames.ACCESSTOKEN)
        .status(200)
        .json({ message: AuthMessages.LOGOUT_SUCCESSFULLY });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
