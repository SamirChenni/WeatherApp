export default function WeatherHeader({ city, countrysign, date , localTime}) {
  return (
    <div className="weather-header">
      <div className="city-country">
        <h1>{city}</h1>
        <div className="country">
          <span>{countrysign}</span>
        </div>
      </div>
      <div className="date-local" >
        <p>{date}</p>
        <p>Local: {localTime}</p>
      </div>
    </div>
  );
}
