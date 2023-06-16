import React, { useState } from 'react';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '9f9aec8ede764980b80212401231506'; // Replace with your actual API key

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div>
      <h2>Weather App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <h3>Weather Information for {weatherData.location.name}</h3>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} alt="Weather icon" />
        </div>
      )}
    </div>
  );
};

export default Weather;
