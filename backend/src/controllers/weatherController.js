
const { getWeatherByCity } = require("../services/weatherService");

const getWeather = async (req, res, next) => {
  try {
    const { city } = req.query;

    if (!city || !city.trim()) {
      return res.status(400).json({
        error: "Please provide a valid city name"
      });
    }

    const weather = await getWeatherByCity(city.trim());

    return res.status(200).json({
      success: true,
      data: weather
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWeather
};
