const UserService = require("./user.service");
const autoBind = require("auto-bind");

class UserController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = UserService;
  }

  async profile(req, res, next) {
    try {
      const user = req.user;
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
