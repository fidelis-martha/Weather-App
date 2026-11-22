
import { Search, MapPin } from "lucide-react";

function SearchBar({ city, setCity, onSearch, loading }) {
  return (
    <form
      onSubmit={onSearch}
      className="flex flex-col sm:flex-row gap-3 mb-8"
    >
      <div className="glass-card flex flex-1 items-center gap-3 rounded-2xl px-4">
        <MapPin size={20} />

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="w-full bg-transparent py-4 outline-none text-white placeholder:text-white/70"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !city.trim()}
        className="rounded-2xl bg-white text-sky-700 px-7 py-4 font-semibold hover:bg-sky-50 disabled:opacity-50"
      >
        <span className="flex items-center justify-center gap-2">
          <Search size={19} />
          {loading ? "Searching..." : "Search"}
        </span>
      </button>
    </form>
  );
}

export default SearchBar;
