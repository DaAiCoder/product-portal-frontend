//Product-portal-frontend\src\components\widgets\WeatherWidget.js

mport React, { useEffect, useState } from 'react';
import {
  getCurrentWeather,
  getForecast,
  getUVIndex,
} from '../../pages/api/weatherAPI';
import { FaCloudSun } from 'react-icons/fa';

export default function WeatherWidget({ config = {} }) {
  const {
    location = '',
    units = 'celsius',
    refreshInterval = 600000,
  } = config;

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [uv, setUV] = useState(null);
  const [error, setError] = useState(null);

  const loadWeather = async () => {
    try {
      const current = await getCurrentWeather(location);
      const fcast = await getForecast(location);
      const uvIndex = await getUVIndex(location);
      setWeather(current);
      setForecast(fcast);
      setUV(uvIndex);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadWeather();
    const iv = setInterval(loadWeather, refreshInterval);
    return () => clearInterval(iv);
  }, [location, refreshInterval]);

  if (error) {
    return <div className="p-2 text-red-500">Error: {error}</div>;
  }
  if (!weather) {
    return <div className="p-2 text-gray-500">Loading weather…</div>;
  }

  const unitSymbol = units === 'fahrenheit' ? '°F' : '°C';

  return (
    <div className="p-2">
      <div className="flex items-center mb-2">
        <FaCloudSun className="mr-1" />
        <strong>Weather{location ? ` in ${location}` : ''}</strong>
      </div>

      <div className="text-sm mb-1">
        {weather.description}, {Math.round(weather.temp)}{unitSymbol}
      </div>
      <div className="text-xs text-gray-600 mb-2">
        Humidity: {weather.humidity}% | UV Index: {uv.index}
      </div>

      <div className="text-xs">
        <strong>Forecast:</strong>
        <ul className="space-y-1">
          {forecast.slice(0, 3).map((day, i) => (
            <li key={i}>
              {day.date}: {day.description}, {Math.round(day.temp)}{unitSymbol}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
