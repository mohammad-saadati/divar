const { Router } = require("express");
const UserController = require("./user.controller");
const AuthorizationGuard = require("../../common/guard/authorization.guard");

const router = Router();

router.get("/profile", AuthorizationGuard, UserController.profile);

module.exports = {
  UserRouter: router,
};
