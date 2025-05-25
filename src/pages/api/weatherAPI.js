//Product-portal-frontend\src\api\weatherAPI.js

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Get current weather for a location (optional).
 * @param {string} location
 * @returns {Promise<Object>}
 */
export async function getCurrentWeather(location = '') {
  const query = location ? `?location=${encodeURIComponent(location)}` : '';
  const res = await fetch(`${BASE_URL}/weather/current${query}`);
  if (!res.ok) {
    throw new Error(`Error fetching current weather: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Check if it will rain (optionally tomorrow) in a location.
 * @param {string} location
 * @returns {Promise<Object>}
 */
export async function willItRain(location = '') {
  const query = location ? `?location=${encodeURIComponent(location)}` : '';
  const res = await fetch(`${BASE_URL}/weather/rain${query}`);
  if (!res.ok) {
    throw new Error(`Error checking rain forecast: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Get a multi-day forecast for a location.
 * @param {string} location
 * @returns {Promise<Object[]>}
 */
export async function getForecast(location = '') {
  const query = location ? `?location=${encodeURIComponent(location)}` : '';
  const res = await fetch(`${BASE_URL}/weather/forecast${query}`);
  if (!res.ok) {
    throw new Error(`Error fetching forecast: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Get current humidity for a location.
 * @param {string} location
 * @returns {Promise<Object>}
 */
export async function getHumidity(location = '') {
  const query = location ? `?location=${encodeURIComponent(location)}` : '';
  const res = await fetch(`${BASE_URL}/weather/humidity${query}`);
  if (!res.ok) {
    throw new Error(`Error fetching humidity: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Get historical high temperature for a date and location.
 * @param {{ date: string, location?: string }} params
 * @returns {Promise<Object>}
 */
export async function getHistoricalHigh({ date, location = '' }) {
  const locQuery = location ? `&location=${encodeURIComponent(location)}` : '';
  const res = await fetch(`${BASE_URL}/weather/historical?date=${encodeURIComponent(date)}${locQuery}`);
  if (!res.ok) {
    throw new Error(`Error fetching historical high: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Set default weather units (celsius or fahrenheit).
 * @param {'celsius'|'fahrenheit'} units
 * @returns {Promise<Object>}
 */
export async function setWeatherUnits(units) {
  const res = await fetch(`${BASE_URL}/weather/units`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ units }),
  });
  if (!res.ok) {
    throw new Error(`Error setting weather units: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Get UV index for a location.
 * @param {string} location
 * @returns {Promise<Object>}
 */
export async function getUVIndex(location = '') {
  const query = location ? `?location=${encodeURIComponent(location)}` : '';
  const res = await fetch(`${BASE_URL}/weather/uv${query}`);
  if (!res.ok) {
    throw new Error(`Error fetching UV index: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Get sunrise or sunset time for a location.
 * @param {'sunrise'|'sunset'} type
 * @param {string} location
 * @returns {Promise<Object>}
 */
export async function getSunriseSunset(type, location = '') {
  const query = location ? `?location=${encodeURIComponent(location)}` : '';
  const res = await fetch(`${BASE_URL}/weather/${type}${query}`);
  if (!res.ok) {
    throw new Error(`Error fetching ${type} time: ${res.statusText}`);
  }
  return res.json();
}
