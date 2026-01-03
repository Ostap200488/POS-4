const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const config = require("../config/config");

const isVerifiedUser = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(createHttpError(401, "Token required"));
    }

    req.user = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    return next(createHttpError(401, "Invalid token"));
  }
};

module.exports = { isVerifiedUser };
