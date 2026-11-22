
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getWeather = async (city) => {
  const response = await fetch(
    `${API_BASE_URL}/api/weather?city=${encodeURIComponent(city)}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Unable to fetch weather data");
  }

  return result.data;
};
