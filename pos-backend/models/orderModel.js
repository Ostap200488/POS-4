const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
    },

    tableNo: {
      type: String,
      required: true,
    },

    customer: {
      name: String,
      phone: String,
      guests: Number,
    },

    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    bills: {
      subtotal: { type: Number, required: true },
      tax: { type: Number, required: true },
      total: { type: Number, required: true },
    },

    paymentMethod: {
      type: String,
      enum: ["Card", "Cash"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// ✅ CORRECT PRE SAVE HOOK (NO next)
orderSchema.pre("save", function () {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${Date.now()}`;
  }
});

module.exports = mongoose.model("Order", orderSchema);
