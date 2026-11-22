
import { MapPin, CloudSun, Droplets, Wind } from "lucide-react";

function CurrentWeather({ weather, theme }) {
  if (!weather) return null;

  const isDark = theme === "dark";

  return (
    <section className="glass-card rounded-[2rem] p-7 sm:p-10 text-white shadow-xl">

      <div className="flex items-center gap-2 mb-10">
        <MapPin size={20} />
        <span className="font-semibold text-lg">
          {weather.city}
        </span>
      </div>

      <div className="text-center mb-12">
        <CloudSun
          size={100}
          strokeWidth={1.3}
          className="mx-auto mb-4 weather-icon"
        />

        <h2 className="text-8xl font-semibold tracking-tight">
          {weather.temperature}°
        </h2>

        <p className="text-xl mt-3 text-white/90">
          {weather.condition}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        <div className="glass-card rounded-2xl p-5">
          <Droplets size={25} className="mb-3" />
          <p className="text-sm text-white/75">Humidity</p>
          <p className="text-2xl font-semibold mt-1">
            {weather.humidity}%
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <Wind size={25} className="mb-3" />
          <p className="text-sm text-white/75">Wind speed</p>
          <p className="text-2xl font-semibold mt-1">
            {weather.windSpeed} km/h
          </p>
        </div>

      </div>
    </section>
  );
}

export default CurrentWeather;
