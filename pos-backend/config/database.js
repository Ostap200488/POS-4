const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    if (!config.databaseURI) throw new Error("MONGO_URI is missing in .env");

    const conn = await mongoose.connect(config.databaseURI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
