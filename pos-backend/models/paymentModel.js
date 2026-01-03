const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    stripeId: String,
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    amount: Number,
    currency: String,
    method: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
