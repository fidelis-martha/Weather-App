
const axios = require("axios");
const redisClient = require("../config/redis");

const CACHE_EXPIRATION = 43200;

const getWeatherByCity = async (city) => {

    
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    const error = new Error("Weather API key is not configured");
    error.statusCode = 500;
    throw error;
  }

  // Normalize the city name for consistent cache keys
  const normalizedCity = city.trim().toLowerCase();

  const cacheKey = `weather:${normalizedCity}`;

  // 1. Check Redis first
  try {
    const cachedWeather = await redisClient.get(cacheKey);

    if (cachedWeather) {
      console.log(`Cache HIT: ${cacheKey}`);
      return JSON.parse(cachedWeather);
    }

    console.log(`Cache MISS: ${cacheKey}`);
  } catch (error) {
    console.error("Redis cache read failed:", error.message);
  }

  // 2. Fetch weather from Visual Crossing
  try {
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}`,
      {
        params: {
          unitGroup: "metric",
          include: "current",
          key: apiKey,
          contentType: "json"
        }
      }
    );

    const current = response.data.currentConditions;

    const weatherData = {
      city: response.data.resolvedAddress,
      temperature: current.temp,
      condition: current.conditions,
      humidity: current.humidity,
      windSpeed: current.windspeed
    };

    // 3. Save weather information in Redis
    try {
      await redisClient.set(
        cacheKey,
        JSON.stringify(weatherData),
        {
          EX: CACHE_EXPIRATION
        }
      );

      console.log(`Weather cached: ${cacheKey}`);
    } catch (error) {
      console.error("Redis cache write failed:", error.message);
    }

    return weatherData;

  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 400) {
        const locationError = new Error(
          "City not found. Please check the city name."
        );
        locationError.statusCode = 404;
        throw locationError;
      }

      if (status === 401 || status === 403) {
        const authError = new Error(
          "Weather provider authentication failed."
        );
        authError.statusCode = 502;
        throw authError;
      }

      if (status === 429) {
        const limitError = new Error(
          "Weather provider request limit reached."
        );
        limitError.statusCode = 503;
        throw limitError;
      }

      const serviceError = new Error(
        "Weather provider is currently unavailable."
      );
      serviceError.statusCode = 503;
      throw serviceError;
    }

    if (error.request) {
      const networkError = new Error(
        "Unable to connect to the weather provider."
      );
      networkError.statusCode = 503;
      throw networkError;
    }

    throw error;
  }
};

module.exports = {
  getWeatherByCity
};
