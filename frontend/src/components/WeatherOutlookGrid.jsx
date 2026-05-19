import OutlookTile from "./OutlookTile";

const WeatherOutlookGrid = ({ weatherData }) => {
  function groupForecastByDay(list) {
    const days = {};

    list.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString("en-GB", {
        weekday: "short",
      }); // e.g. "Mon, 19 May"

      if (!days[date]) {
        days[date] = [];
      }
      days[date].push(entry);
    });

    // For each day, extract what you need
    return Object.entries(days)
      .map(([date, entries]) => {
        const midday =
          entries.find((e) => new Date(e.dt * 1000).getHours() === 12) ||
          entries[Math.floor(entries.length / 2)]; // fallback to middle entry

        return {
          day: date,
          icon: midday.weather[0].icon, // e.g. "10d"
          temp: Math.round(midday.main.temp),
          tempMin: Math.round(Math.min(...entries.map((e) => e.main.temp_min))),
        };
      })
      .slice(0, 5); // ensure exactly 5 days
  }
  return (
    <div className="outlook-container" >
      <h2 className="outlook-title">5-Day Outlook</h2>
      <div className="stats-grid-container">
        {groupForecastByDay(weatherData.forecastList).map((stat , index) => (
          <OutlookTile
            key={index}
            label={stat.day}
            icon={stat.icon}
            value={`${stat.temp}°`}
            subtext={`${stat.tempMin}°`}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherOutlookGrid;
