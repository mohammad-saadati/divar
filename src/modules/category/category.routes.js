const { Router } = require("express");
const categoryController = require("./category.controller");

const router = Router();

// router.post("/send-otp", authController.sendOTP);
// router.post("/check-otp", authController.checkOTP);
// router.post("/logout", authController.logout);

module.exports = {
  CategoryRouter: router,
};
