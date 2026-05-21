require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { City } = require("country-state-city");
const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_URL, "https://monmeteo.netlify.app"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/cities/search", (req, res) => {
  const { q } = req.query; // Get the search query from the URL (e.g., /cities/search?q=Al)

  if (!q || q.length < 2) return res.json([]); // Don't search for just 1 letter

  // 1. Get all cities (or you could filter by country if you wanted)
  const allCities = City.getAllCities();

  // 2. Use RegEx to filter (just like we did in React, but on the server)
  const regex = new RegExp(`^${q}`, "i");
  const matches = allCities.filter((city) => regex.test(city.name)).slice(0, 10); // Only return top 10 to keep it fast

  res.json(matches.map((c) => `${c.name}, ${c.countryCode}`)); // Return in "City, CountryCode" format
});

app.post("/weather", async (req, res) => {
  const apiKey = process.env.API_KEY;
  const query = req.body.cityName;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`; // Current weather endpoint
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=metric&cnt=40`; // 5-day forecast endpoint
  if (!query || query.trim() === "") {
    return res.status(400).json({ message: "City name is required" });
  }
  const getWindDirection = (deg) => {
    // Array of 8 primary compass points
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    // Calculate the closest index
    const index = Math.round(deg / 45) % 8;

    return directions[index];
  };

  try {
    const [weatherRes, forecastRes] = await Promise.all([
      axios.get(weatherUrl),
      axios.get(forecastUrl),
    ]);
    const data = weatherRes.data;
    const forecastData = forecastRes.data;
    const localMs = (data.dt + data.timezone) * 1000;

    // 2. Create a Date object for the city, but get the hour using UTC

    const localHour = new Date(localMs).getUTCHours();

    // 3. Check if the local hour is night (e.g., between 6 PM [18] and 6 AM [6])
    const isNight = localHour >= 18 || localHour < 6;
    // MAP THE DATA to match your React component props
    const formattedData = {
      city: data.name,
      countrysign: data.sys.country,
      date:
        new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }) +
        "\n" +
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      localTime: new Date((data.dt + data.timezone) * 1000).toLocaleTimeString(
        [],
        {
          timeZone: "UTC",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        },
      ),
      temp: Math.round(data.main.temp),
      condition: data.weather[0].description,
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDir: getWindDirection(data.wind.deg), // You can calculate direction from data.wind.deg if needed
      pressure: data.main.pressure,
      visibility: data.visibility / 1000,
      clouds: data.clouds.all,
      minTemp: Math.round(data.main.temp_min),
      maxTemp: Math.round(data.main.temp_max),
      weatherIcon: data.weather[0].icon,
      forecastList: forecastData.list, // This will be an array of forecast data points (every 3 hours for 5 days)
      isNight: isNight,
    };

    // Send the clean object to React
    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "City not found" });
  }
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


