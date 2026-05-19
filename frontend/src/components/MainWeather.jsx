import { useState } from "react";
export default function MainWeather({ temp, condition, feelsLike , weatherIcon }) {
  const [unit, setUnit] = useState("C");

  return (
    <div className="main-weather-container">
      {/* Weather Icon Section */}
      <div className="weather-icon-main">
        {/* You can replace this with a real <img> or SVG from your assets */}
        <img src={"https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png"} alt="weather-icon" />
      </div>

      {/* Temperature and Info Section */}
      <div className="temperature-section">
        <div className="temp-display">
          <span className="temp-value">
            {unit === "C" ? temp : Math.round((temp * 9) / 5 + 32)}
          </span>
          <span className="temp-degree">°{unit === "C" ? "C" : "F"}</span>

          {/* Unit Toggle */}
          <div className="unit-toggle">
            <div
              className={`selection-slider ${unit === "F" ? "slide-right" : ""}`}
            ></div>
            <button
              className={unit === "C" ? "active" : ""}
              onClick={() => setUnit("C")}
            >
              °C
            </button>
            <button
              className={unit === "F" ? "active" : ""}
              onClick={() => setUnit("F")}
            >
              °F
            </button>
          </div>
        </div>

        <div className="weather-description">
          <h2>{condition}</h2>
          <p>
            Feels like{" "}
            {unit === "C" ? feelsLike : Math.round((feelsLike * 9) / 5 + 32)}°
            {unit === "C" ? "C" : "F"}
          </p>
        </div>
      </div>
    </div>
  );
}
