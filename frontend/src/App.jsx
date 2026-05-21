import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import axios from "axios";
import ScrolltoTop from "./components/ScrolltoTop";
import { useState } from "react";

const getBackgroundClass = (weatherData) => {
  if (!weatherData) return "bg-default"; // Initial state (blank screen)

  const condition = weatherData.condition.toLowerCase(); // e.g., "clouds", "clear", "rain"
  
  // OpenWeatherMap icons end in 'd' for day and 'n' for night. 

  const isNight = weatherData.isNight; 

  if (isNight) return "bg-night";

  // Daytime conditions
  if (condition.includes("clear")) return "bg-sunny";
  if (condition.includes("cloud")) return "bg-cloudy";
  if (condition.includes("rain") || condition.includes("drizzle")) return "bg-rainy";
  if (condition.includes("snow")) return "bg-snowy";
  if (condition.includes("thunderstorm")) return "bg-stormy";

  return "bg-sunny"; // Fallback day background
};

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  
  const backgroundClass = getBackgroundClass(weatherData);
  const fetchWeather = async (cityName) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/weather`, {
        cityName,
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`dashboard-container ${backgroundClass}`}>
      <SearchBar weatherData={weatherData} onSearch={fetchWeather} isLoading={isLoading} />
      <ScrolltoTop />
      <Footer />
    </div>
  );
}
