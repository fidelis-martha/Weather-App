
const rateLimit = require("express-rate-limit");

const weatherLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests. Please try again after 15 minutes."
  }
});

module.exports = weatherLimiter;
