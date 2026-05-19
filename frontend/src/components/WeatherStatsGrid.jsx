import StatTile from "./StatTile"
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudIcon from '@mui/icons-material/Cloud';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const WeatherStatsGrid = ({ weatherData }) => {
  // We can define the stats based on the image structure
  const stats = [
    { id: 1, icon: <WaterDropIcon />, label: "HUMIDITY", value: `${weatherData.humidity}%`, subtext: "Relative" },
    { id: 2, icon: <AirIcon />, label: "WIND", value: `${weatherData.windSpeed} km/h`, subtext: weatherData.windDir },
    { id: 3, icon: <ThermostatIcon />, label: "PRESSURE", value: `${weatherData.pressure} hPa`, subtext: "Atmospheric" },
    { id: 4, icon: <VisibilityIcon />, label: "VISIBILITY", value: `${weatherData.visibility} km`, subtext: "Clear" },
    { id: 5, icon: <CloudIcon />, label: "CLOUD COVER", value: `${weatherData.clouds}%`, subtext: "Sky covered" },
    { id: 6, icon: <AnalyticsIcon />, label: "MIN / MAX", value:  `${weatherData.minTemp}° / ${weatherData.maxTemp}°`, subtext: "Today" }
  ];

  return (
    <div className="stats-grid-container">
      {stats.map((stat) => (
        <StatTile 
          key={stat.id}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          subtext={stat.subtext}
        />
      ))}
    </div>
  );
};

export default WeatherStatsGrid;