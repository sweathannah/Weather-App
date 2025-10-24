import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudLightning, 
  Snowflake, 
  Haze,  
  Wind 
} from 'lucide-react';

/**
 * Renders a weather icon based on the main weather condition.
 * @param {object} props
 * @param {string} props.main - The main weather condition (e.g., "Clouds", "Clear").
 * @param {number} props.size - The size of the icon.
 */
function WeatherIcon({ main, size = 80 }) {
  const mainLower = main.toLowerCase();

  switch (mainLower) {
    case 'clouds':
      return <Cloud size={size} className="text-gray-300" />;
    case 'clear':
      return <Sun size={size} className="text-yellow-400" />;
    case 'rain':
    case 'drizzle':
      return <CloudRain size={size} className="text-blue-400" />;
    case 'thunderstorm':
      return <CloudLightning size={size} className="text-yellow-500" />;
    case 'snow':
      return <Snowflake size={size} className="text-white" />;
    case 'mist':
    case 'fog':
    case 'haze':
    case 'smoke':
      return <Haze size={size} className="text-gray-400" />; // <-- 2. Changed from Smog
    default:
      return <Wind size={size} className="text-gray-300" />;
  }
}

export default WeatherIcon;