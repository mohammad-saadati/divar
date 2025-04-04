const authService = require("./auth.service");
const autoBind = require("auto-bind");
const { AuthMessages } = require("./auth.messages");

class AuthController {
  #service;

  constructor() {
    this.#service = authService;
    autoBind(this);
  }

  async sendOTP(res, req, next) {
    try {
      const { mobile } = req.mobile;
      await this.#service.sendOTP(mobile);
      return {
        message: AuthMessages.SEND_OTP_SUCCESS,
      };
    } catch (error) {
      next(error);
    }
  }
  async checkOTP(res, req, next) {
    this.sendOTP();
    return;
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
