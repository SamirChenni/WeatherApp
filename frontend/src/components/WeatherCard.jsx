import WeatherHeader from "./WeatherHeader";
import WeatherStatsGrid from "./WeatherStatsGrid";
import MainWeather from "./MainWeather";

export default function WeatherCard({ weatherData }) {
  return (
    <div className="weather-card-style">
      <WeatherHeader
        city={weatherData.city}
        countrysign={weatherData.countrysign}
        date={weatherData.date}
        localTime={weatherData.localTime}
      />
      <MainWeather
        temp={weatherData.temp}
        condition={weatherData.condition}
        feelsLike={weatherData.feelsLike}
        weatherIcon={weatherData.weatherIcon}
      />
      <WeatherStatsGrid weatherData={weatherData} />
    </div>
  );
}
