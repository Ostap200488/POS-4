require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");
const globalErrorHandler = require("./middleware/globalErrorHandler");

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ======================
   ROUTES
====================== */
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/payment", require("./routes/payment.Route"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));

/* ======================
   404 HANDLER
====================== */
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ======================
   GLOBAL ERROR HANDLER
====================== */
app.use(globalErrorHandler);

/* ======================
   SERVER START
====================== */
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 POS Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1); // ⛔ Do NOT run server without DB
  }
};

startServer();
