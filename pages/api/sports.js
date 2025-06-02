// File: C:\Users\Rolan\Downloads\Product-portal-frontend\src\api\sportsAPI.js

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetch today’s games.
 * @returns {Promise<Object[]>}
 */
export async function getTodayGames() {
  const res = await fetch(`${BASE_URL}/sports/today`);
  if (!res.ok) {
    throw new Error(`Error fetching today’s games: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch the score for a given team.
 * @param {string} team
 * @returns {Promise<Object>}
 */
export async function getGameScore(team) {
  const res = await fetch(
    `${BASE_URL}/sports/score?team=${encodeURIComponent(team)}`
  );
  if (!res.ok) {
    throw new Error(`Error fetching score for ${team}: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch upcoming games.
 * @returns {Promise<Object[]>}
 */
export async function listUpcomingGames() {
  const res = await fetch(`${BASE_URL}/sports/upcoming`);
  if (!res.ok) {
    throw new Error(`Error fetching upcoming games: ${res.statusText}`);
  }
  return res.json();
}
