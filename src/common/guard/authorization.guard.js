const createHttpError = require("http-errors");
const AuthorizationMessage = require("../message/auth.message");
const jwt = require("jsonwebtoken");
const User = require("../../modules/user/user.model");

const AuthorizationGuard = async (req, res, next) => {
  try {
    const token = req?.cookies?.access_token;

    if (!token)
      throw new createHttpError.Unauthorized(AuthorizationMessage.UNAUTHORIZED);

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (payload?.userId) {
      const user = await User.findById(payload.userId, {
        otp: 0,
        __v: 0,
        updatedAt: 0,
        createdAt: 0,
      }).lean();

      if (!user)
        throw new createHttpError.Unauthorized(
          AuthorizationMessage.NOT_FOUNT_ACCOUNT
        );

      req.user = user;

      return next();
    }

    throw new createHttpError.Unauthorized(
      AuthorizationMessage.TOKEN_NOT_VALID
    );
  } catch (error) {
    next(error);
  }
};

module.exports = AuthorizationGuard;
