
require("dotenv").config();

const app = require("./app");
const redisClient = require("./config/redis");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await redisClient.connect();

    console.log("Redis connection established.");

    app.listen(PORT, () => {
      console.log(`Weather API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
