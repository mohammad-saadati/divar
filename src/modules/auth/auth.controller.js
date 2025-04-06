const authService = require("./auth.service");
const autoBind = require("auto-bind");
const { AuthMessages } = require("./auth.messages");

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

      return res.json({
        message: AuthMessages.LOGIN_SUCCESS,
        token: accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
