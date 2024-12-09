import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Weather() {
  const router = useRouter();
  const { city } = router.query;

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b764bf3723cb1eff8817f1dabb030b8c&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    };

    fetchWeather();
  }, [city]);

  // Convert Celsius to Fahrenheit
  const convertToFahrenheit = (tempCelsius) => {
    return (tempCelsius * 9) / 5 + 32;
  };

  // Format Unix time to local time
  const formatTime = (time) => new Date(time * 1000).toLocaleTimeString();

  if (loading) return <p>Loading...</p>;
  if (!weatherData) return <p>City not found!</p>;

  const {
    main: { temp, temp_min, temp_max, humidity, pressure },
    wind: { speed, deg },
    weather: [{ description, icon }],
    sys: { sunrise, sunset },
    visibility,
    air_quality: { aqi } = { aqi: "N/A" }, // Handle air quality data if available
  } = weatherData;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Weather in {weatherData.name}</h1>
        <hr></hr>
      <div>
        <p>Conditions: {description}</p>
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt={description}
        />
      </div>

      <div>
        <p>
          Temperature: {temp}°C / {convertToFahrenheit(temp)}°F
        </p>
        <p>Feels Like: {temp}°C / {convertToFahrenheit(temp)}°F</p>
        <p>Min Temperature: {temp_min}°C / {convertToFahrenheit(temp_min)}°F</p>
        <p>Max Temperature: {temp_max}°C / {convertToFahrenheit(temp_max)}°F</p>
      </div>

      <div>
        <p>Humidity: {humidity}%</p>
        <p>Pressure: {pressure} hPa</p>
      </div>

      <div>
        <p>Wind Speed: {speed} km/h</p>
        <p>Wind Direction: {deg}°</p>
      </div>

      <div>
        <p>Sunrise: {formatTime(sunrise)}</p>
        <p>Sunset: {formatTime(sunset)}</p>
      </div>

      <div>
        <p>Visibility: {visibility / 1000} km</p>
      </div>

      <div>
        <p>Air Quality Index: {aqi}</p>
      </div>
    </div>
  );
}
