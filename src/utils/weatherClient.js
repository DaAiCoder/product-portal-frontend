// src/utils/weatherClient.js
const BASE = '/api/weatherAPI';

/** GET /api/weatherAPI */
export async function getWeather() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Error getting weather (${res.status})`);
  return res.json();
}

/** GET /api/weatherAPI?city=... */
export async function getWeatherByCity(city) {
  const res = await fetch(`${BASE}?city=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error(`Error getting weather for ${city} (${res.status})`);
  return res.json();
}

/** GET /api/weatherAPI?rainTomorrow=city */
export async function willItRain(city) {
  const res = await fetch(`${BASE}?rainTomorrow=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error(`Error checking rain (${res.status})`);
  return res.json();
}

/** GET /api/weatherAPI?forecastWeekend=city */
export async function getForecastWeekend(city) {
  const res = await fetch(`${BASE}?forecastWeekend=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error(`Error getting weekend forecast (${res.status})`);
  return res.json();
}

/** GET /api/weatherAPI?humidity=city */
export async function getHumidity(city) {
  const res = await fetch(`${BASE}?humidity=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error(`Error getting humidity (${res.status})`);
  return res.json();
}

/** GET /api/weatherAPI?historicalHigh=date&city=... */
export async function getHistoricalHigh(date, city) {
  const res = await fetch(
    `${BASE}?historicalHigh=${encodeURIComponent(date)}&city=${encodeURIComponent(city)}`
  );
  if (!res.ok) throw new Error(`Error getting historical high (${res.status})`);
  return res.json();
}

/** POST { action:"units", unit:"celsius"|"fahrenheit" } */
export async function setWeatherUnits(unit) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'units', unit }),
  });
  if (!res.ok) throw new Error(`Error setting units (${res.status})`);
  return res.json();
}

/** GET /api/weatherAPI?uvIndex=city */
export async function getUVIndex(city) {
  const res = await fetch(`${BASE}?uvIndex=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error(`Error getting UV index (${res.status})`);
  return res.json();
}

/** GET /api/weatherAPI?sunrise=city */
export async function getSunrise(city) {
  const res = await fetch(`${BASE}?sunrise=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error(`Error getting sunrise time (${res.status})`);
  return res.json();
}

/** GET /api/weatherAPI?sunset=city */
export async function getSunset(city) {
  const res = await fetch(`${BASE}?sunset=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error(`Error getting sunset time (${res.status})`);
  return res.json();
}
