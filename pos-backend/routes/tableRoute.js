console.log("✅ tableRoute.js LOADED");


const express = require("express");
const router = express.Router();

const { isVerifiedUser } = require("../middleware/tokenVerification");
const {
  createTable,
  getTables,
  lockTable,
  unlockTable,
} = require("../controllers/tableController");

router.post("/", isVerifiedUser, createTable);
router.get("/", isVerifiedUser, getTables);
router.post("/lock", isVerifiedUser, lockTable);
router.post("/unlock", isVerifiedUser, (req, res) => {
  res.json({
    ok: true,
    user: req.user,
  });
});

module.exports = router;
