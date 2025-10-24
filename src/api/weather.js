const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const response = await fetch(`${BASE_URL}?q=${city}&appid=${apiKey}&units=metric`);
  
  if (!response.ok) {
    throw new Error('City not found');
  }

  const data = await response.json();
  return data;
};
