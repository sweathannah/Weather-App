import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import WeatherIcon from "../components/WeatherIcon"; // Import new component
import RainEffect from "../components/RainEffect"; // Import effect
import SunEffect from "../components/SunEffect"; // Import effect
import { Droplet, Wind, CloudSun } from "lucide-react"; // Import icons

function WeatherPage() {
  const [city, setCity] = useState(() => localStorage.getItem("lastCity") || "");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_KEY = "c4a9aa6d5429d2ce58ec39a9663bd52c";

  useEffect(() => {
    if (!city) return;
    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      setWeather(null); // Clear old weather on new search
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();

        if (data.cod === "404") {
          setError("City not found ❌");
        } else {
          setWeather(data);
          localStorage.setItem("lastCity", city);
        }
      } catch (err) {
        setError("Network error 😢");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  const handleSearch = (searchedCity) => setCity(searchedCity);

  // Helper function to determine the visual theme
  const getWeatherTheme = (weather) => {
    if (!weather) return "default";
    const main = weather.weather[0].main.toLowerCase();
    
    if (main.includes("rain") || main.includes("drizzle")) return "rain";
    if (main.includes("clear")) return "sunny";
    if (main.includes("clouds")) return "cloudy";
    if (main.includes("snow")) return "snow";
    if (main.includes("thunderstorm")) return "storm";
    return "default";
  };

  const theme = getWeatherTheme(weather);

  return (
    // Add relative and overflow-hidden to contain the effects
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 font-[Poppins] overflow-hidden">
      
      {/* --- DYNAMIC BACKGROUND EFFECTS --- */}
      {theme === "rain" && <RainEffect />}
      {theme === "sunny" && <SunEffect />}
      {/* You can add more else-if blocks here for snow, clouds, etc. */}

      <motion.div
        // Add z-10 to ensure the card is on top of the effects
        className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md text-white z-10"
        
        // --- DIFFERENT ANIMATIONS (GOAL 1) ---
        // By adding a key, React & Framer Motion will treat this as a 
        // new component when the weather.id changes, re-running the animation.
        key={weather ? weather.id : "empty"}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          // Use a "spring" for sunny, and a gentler "tween" for rain!
          type: theme === "sunny" ? "spring" : "tween",
          stiffness: theme === "sunny" ? 120 : 100,
        }}
      >
        <h1 className="text-3xl font-bold text-center text-blue-300 mb-6 flex items-center justify-center gap-2">
          <CloudSun size={32} /> Weather App {/* Replaced emoji */}
        </h1>

        <SearchBar onSearch={handleSearch} />

        {loading && <p className="text-center text-gray-300 mt-4">Loading...</p>}
        {error && <p className="text-center text-red-400 mt-4">{error}</p>}

        {weather && !loading && !error && (
          <motion.div
            // This inner animation just fades in the content
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <h2 className="text-2xl font-semibold text-blue-200">
              {weather.name}, {weather.sys.country}
            </h2>
            
            {/* --- REPLACED EMOJI WITH COMPONENT (GOAL 2) --- */}
            <div className="flex justify-center my-2">
              <WeatherIcon main={weather.weather[0].main} size={100} />
            </div>

            <p className="text-6xl font-bold mt-2 text-blue-400">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="capitalize text-gray-300">
              {weather.weather[0].description}
            </p>
            <div className="mt-6 flex justify-center gap-6 text-sm text-gray-300">
              {/* --- REPLACED EMOJIS WITH LUCIDE (GOAL 2) --- */}
              <p className="flex items-center gap-1.5">
                <Droplet size={16} /> {weather.main.humidity}%
              </p>
              <p className="flex items-center gap-1.5">
                <Wind size={16} /> {weather.wind.speed} m/s
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default WeatherPage;