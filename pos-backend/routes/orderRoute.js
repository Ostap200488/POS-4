const express = require("express");
const router = express.Router();

const { isVerifiedUser } = require("../middleware/tokenVerification"); // ✅ FIX
const {
  addOrder,
  getOrders,
  markOrderPaid,
} = require("../controllers/orderController");

/* ======================
   CREATE ORDER
   Roles: cashier, admin
====================== */
router.post("/", isVerifiedUser, addOrder);

/* ======================
   GET ALL ORDERS
====================== */
router.get("/", isVerifiedUser, getOrders);

/* ======================
   MARK ORDER AS PAID
   REST-style endpoint
====================== */
router.put("/:id/pay", isVerifiedUser, markOrderPaid);

module.exports = router;
