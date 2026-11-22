
import { useState, useEffect, useCallback } from "react";
import { getWeather } from "../services/weatherApi";

function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationStatus, setLocationStatus] = useState("detecting");

  const fetchWeather = useCallback(async (location) => {
    setLoading(true);
    setError("");

    try {
      const data = await getWeather(location);
      setWeather(data);
      return data;
    } catch (err) {
      setError(err.message);
      setWeather(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Detect user's location when the app opens
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("unavailable");
      setError("Your browser does not support location detection.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        setLocationStatus("success");

        await fetchWeather(`${latitude},${longitude}`);
      },
      (err) => {
        setLocationStatus("unavailable");

        if (err.code === 1) {
          setError("Location permission denied. Please search for a city.");
        } else {
          setError("Unable to detect your location. Please search for a city.");
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  }, [fetchWeather]);

  // Manual city search
  const searchCity = async (city) => {
    if (!city.trim()) return;

    setLocationStatus("manual");
    return fetchWeather(city.trim());
  };

  return {
    weather,
    loading,
    error,
    locationStatus,
    searchCity
  };
}

export default useWeather;
