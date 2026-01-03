const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  // ❗ 401 is normal for auth checks — don't panic-log it
  if (statusCode !== 401) {
    console.error("GLOBAL ERROR:", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = globalErrorHandler;
