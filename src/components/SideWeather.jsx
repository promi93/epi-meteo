import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const SideWeather = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const cities = ["Rome", "New York", "Tokyo"];
    const fetchData = async () => {
      const apiKey = "b7ea144e88a7f024f0a73e3e9f92c41c";

      try {
        const responses = await Promise.all(
          cities.map((city) =>
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            )
          )
        );
        const data = await Promise.all(
          responses.map((response) => response.json())
        );
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="sidebar">
      {weatherData.map((data) => (
        <Card key={data.id}>
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            {data.main && (
              <Card.Text>
                {data.main && (
                  <>
                    Temperature: {data.main.temp}°C <br />
                    Humidity: {data.main.humidity}% <br />
                  </>
                )}
                {data.weather && data.weather[0] && (
                  <>Weather: {data.weather[0].description}</>
                )}
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default SideWeather;
