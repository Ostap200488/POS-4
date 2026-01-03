const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
} = require("../controllers/userController");

const { isVerifiedUser } = require("../middleware/tokenVerification"); // ✅ FIX

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/", isVerifiedUser, getMe);
router.post("/logout", isVerifiedUser, logout);

module.exports = router;
