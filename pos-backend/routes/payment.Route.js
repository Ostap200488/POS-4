const express = require("express");
const router = express.Router();
const { createPaymentIntent } = require("../controllers/paymentController");

// 🔓 NO AUTH while testing
router.post("/create-payment-intent", createPaymentIntent);

module.exports = router;
