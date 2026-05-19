import React, { useState } from "react";
import { City } from "country-state-city"; // Import the database
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import WeatherCard from "./WeatherCard";
import WeatherOutlookGrid from "./WeatherOutlookGrid";
import weatherLogo from "../assets/weatherlogo.png";
import ClearIcon from "@mui/icons-material/Clear";

export default function SearchBar({ weatherData, onSearch, isLoading }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  // Get ALL cities once (this happens outside the render for performance)
  const allCities = City.getAllCities();

  const formatSuggestion = (cityName, value) => {
    // Split using parenthesis () around the regex so the matched part is kept
    const regex = new RegExp(`(${value})`, "i");
    const parts = cityName.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? <strong key={index}>{part}</strong> : part,
    );
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length >= 2) {
      // Use RegEx for that "Search as you type" feeling
      const regex = new RegExp(`^${value}`, "i");

      // Filter the imported database
      const filtered = allCities
        .filter((city) => regex.test(city.name))
        .slice(0, 10);
      setSuggestions(filtered);
      setShowNoResults(filtered.length === 0);
    } else {
      setSuggestions([]);
      setShowNoResults(false);
    }
  };

  const handleSelect = (cityName) => {
    // Strip the country code before searching weather (e.g., "Algiers, DZ" -> "Algiers")
    const cleanName = cityName.split(",")[0];
    setInput(cleanName);
    setSuggestions([]);
    setShowNoResults(false);
    onSearch(cleanName);
  };

  return (
    <div className="page-center-wrapper">
      <div className="app-identity">
        <div className="weather-logo-organized">
          <img src={weatherLogo} alt="Weather Icon" className="app-icon" />
          <h1 className="app-title">
            Sky<span className="title-accent">Cast</span>
          </h1>
        </div>
        <p className="app-slogan">
          Discover real-time weather forecasts anywhere in the world
        </p>
      </div>
      <div className="search-container" style={{ position: "relative" }}>
        <div className="search-icon-wrapper">
          <SearchIcon />
        </div>
        <input
          type="text"
          className="search-input"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            e.key === "Enter" &&
              (onSearch(input), setSuggestions([]), setShowNoResults(false));
          }}
          placeholder="Search for a city..."
        />

        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((city, index) => (
              <li
                key={index}
                onClick={() => {
                  // When clicked, fill the input with the full text
                  setInput(`${city.name}, ${city.countryCode}`);
                  handleSelect(`${city.name}, ${city.countryCode}`);
                }}
              >
                {/* This bolds the typed part of the name, then tacks on the country code */}
                {formatSuggestion(city.name, input)}, {city.countryCode}
              </li>
            ))}
          </ul>
        )}

        {input.length > 0 && (
          <div
            className="clear-icon-wrapper"
            onClick={() => {
              setInput("");
              setSuggestions([]);
              setShowNoResults(false);
            }}
          >
            <ClearIcon fontSize="large" sx={{ color: "#fff" }} />
          </div>
        )}

        {showNoResults && (
          <div className="no-suggestions">There is no matching city found.</div>
        )}
      </div>
      {isLoading ? (
        <CircularProgress size="30px" aria-label="Loading…" />
      ) : (
        weatherData &&
        !showNoResults && (
          <>
            <WeatherCard weatherData={weatherData} />
            <WeatherOutlookGrid weatherData={weatherData} />
          </>
        )
      )}
    </div>
  );
}
