
import { useState } from "react";
import { Cloud, CloudSun, Moon, Sun } from "lucide-react";

import SearchBar from "./searchBar";
import CurrentWeather from "./currentWeather";
import useWeather from "../hooks/useWeather";

function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [theme, setTheme] = useState("light");

  const {
    weather,
    loading,
    error,
    locationStatus,
    searchCity,
  } = useWeather();

  const isDark = theme === "dark";

  const handleSearch = async (e) => {
    e.preventDefault();
    await searchCity(city);
  };

 
return (
  <main
    className={`relative min-h-screen overflow-hidden px-5 py-8 ${
      isDark
        ? "bg-gradient-to-b from-slate-800 via-blue-950 to-slate-900 text-white"
        : "bg-gradient-to-b from-sky-400 via-sky-300 to-blue-500 text-white"
    }`}
  >
    {/* Small drifting clouds */}
    <Cloud size={30} className="cloud top-28 left-0" />
    <Cloud size={22} className="cloud cloud-two top-60 left-0" />
    <Cloud size={35} className="cloud cloud-three top-96 left-0" />

    <div className="relative z-10 max-w-3xl mx-auto">

      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <CloudSun size={30} />
          <h1 className="text-2xl font-bold">Weatherly</h1>
        </div>

        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="glass-card rounded-full p-3"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <section className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          Your weather, at a glance.
        </h2>
        <p className="text-white/80">
          Stay updated wherever you are.
        </p>
      </section>

      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
        loading={loading}
        theme={theme}
      />

      {locationStatus === "detecting" && (
        <p className="text-center mb-4 text-white/80">
          Detecting your location...
        </p>
      )}

      {error && (
        <p className="text-center text-white mb-5">
          {error}
        </p>
      )}

      {loading && (
        <p className="text-center mb-5">
          Getting weather information...
        </p>
      )}

      {!loading && weather && (
        <CurrentWeather weather={weather} theme={theme} />
      )}

      <footer className="text-center text-white/70 text-sm mt-12">
        Weatherly · Powered by Visual Crossing
      </footer>

    </div>
  </main>
);

}

export default WeatherDashboard;
