require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = Object.freeze({
  port: process.env.PORT || 8000,
  databaseURI: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET,
  stripeSecret: process.env.STRIPE_SECRET_KEY,
});
