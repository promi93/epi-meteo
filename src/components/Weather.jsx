import React, { useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    const apiKey = "b7ea144e88a7f024f0a73e3e9f92c41c";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Errore durante la richiesta delle informazioni meteo");
    }

    setLoading(false);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getTemperatureIcon = (temperature) => {
    if (temperature < 5) {
      return "❄️";
    } else if (temperature < 15) {
      return "🌡️";
    } else if (temperature < 25) {
      return "☀️";
    } else {
      return "🔥";
    }
  };

  return (
    <div className="Weather">
      <form onSubmit={handleFormSubmit}>
        <label>
          <p>Seleziona la città:</p>
          <input type="text" value={city} onChange={handleCityChange} />
        </label>
        <button type="submit">Cerca</button>
      </form>

      {loading && (
        <div className="Weather-loading">
          <FontAwesomeIcon icon={faSpinner} spin />
          <p>Caricamento...</p>
        </div>
      )}

      {error && <p>{error}</p>}

      {weatherData && (
        <div className="Weather-data">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>
            {getTemperatureIcon(weatherData.main.temp)}
            Temperatura: {weatherData.main.temp} °C
          </p>
          <p>
            {getTemperatureIcon(weatherData.main.temp_min)}
            Minima: {weatherData.main.temp_min} °C
          </p>
          <p>
            {getTemperatureIcon(weatherData.main.temp_max)}
            Massima: {weatherData.main.temp_max} °C
          </p>
          <p>Pressione: {weatherData.main.pressure} hPa</p>
          <p>Umidità: {weatherData.main.humidity} %</p>
          {weatherData.rain && (
            <p>
              Pioggia: {weatherData.rain["1h"]} mm/h
              {"  "}
              ☔️
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Weather;
