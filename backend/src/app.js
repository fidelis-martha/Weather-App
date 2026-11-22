
const express = require("express");

const app = express();

const weatherRoutes = require("./routes/weatherRoutes");
const errorHandler = require("./middleware/errorHandler");
const weatherLimiter = require("./middleware/rateLimiter");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Weather API is running!"
  });
});

app.use("/api/weather", weatherLimiter , weatherRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});

// Central error handler
app.use(errorHandler);

module.exports = app;
