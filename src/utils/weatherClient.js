// src/utils /weatherClient.js
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Get current weather for a city (defaults to New York)
export async function getCurrentWeather(location = 'New York', units = 'imperial') {
  const query = `?location=${encodeURIComponent(location)}&units=${encodeURIComponent(units)}`;
  const res = await fetch(`${BASE_URL}/weather/current${query}`);
  if (!res.ok) throw new Error(`Error getting weather (${res.status})`);
  return res.json();
}

// Get multi-day forecast for a city
export async function getForecast(location = 'New York', units = 'imperial') {
  const query = `?location=${encodeURIComponent(location)}&units=${encodeURIComponent(units)}`;
  const res = await fetch(`${BASE_URL}/weather/forecast${query}`);
  if (!res.ok) throw new Error(`Error getting forecast (${res.status})`);
  return res.json();
}

// Get current humidity for a city
export async function getHumidity(location = 'New York', units = 'imperial') {
  const query = `?location=${encodeURIComponent(location)}&units=${encodeURIComponent(units)}`;
  const res = await fetch(`${BASE_URL}/weather/humidity${query}`);
  if (!res.ok) throw new Error(`Error getting humidity (${res.status})`);
  return res.json();
}

// Will it rain tomorrow in a city?
export async function willItRain(location = 'New York') {
  const query = `?location=${encodeURIComponent(location)}`;
  const res = await fetch(`${BASE_URL}/weather/rain${query}`);
  if (!res.ok) throw new Error(`Error checking rain (${res.status})`);
  return res.json();
}

// Get historical high (requires paid OWM, demo returns a placeholder)
export async function getHistoricalHigh(date, location = 'New York') {
  const query = `?date=${encodeURIComponent(date)}&location=${encodeURIComponent(location)}`;
  const res = await fetch(`${BASE_URL}/weather/historical${query}`);
  if (!res.ok) throw new Error(`Error getting historical high (${res.status})`);
  return res.json();
}

// Set default weather units (per session)
export async function setWeatherUnits(units) {
  const res = await fetch(`${BASE_URL}/weather/units`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ units }),
  });
  if (!res.ok) throw new Error(`Error setting units (${res.status})`);
  return res.json();
}

// Get UV index for a city
export async function getUVIndex(location = 'New York') {
  const query = `?location=${encodeURIComponent(location)}`;
  const res = await fetch(`${BASE_URL}/weather/uv${query}`);
  if (!res.ok) throw new Error(`Error getting UV index (${res.status})`);
  return res.json();
}

// Get sunrise time for a city
export async function getSunrise(location = 'New York') {
  const query = `?location=${encodeURIComponent(location)}`;
  const res = await fetch(`${BASE_URL}/weather/sunrise${query}`);
  if (!res.ok) throw new Error(`Error getting sunrise time (${res.status})`);
  return res.json();
}

// Get sunset time for a city
export async function getSunset(location = 'New York') {
  const query = `?location=${encodeURIComponent(location)}`;
  const res = await fetch(`${BASE_URL}/weather/sunset${query}`);
  if (!res.ok) throw new Error(`Error getting sunset time (${res.status})`);
  return res.json();
}
