const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    seats: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Available", "Booked"],
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Table", tableSchema);
