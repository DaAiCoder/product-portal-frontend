//Product-portal-frontend\ src\api\calculatorAPI.js

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Evaluate a mathematical expression.
 * @param {string} expression – e.g. "2+2*3"
 * @returns {Promise<{ result: number }>}
 */
export async function calculate(expression) {
  const res = await fetch(
    `${BASE_URL}/calculator?expression=${encodeURIComponent(expression)}`
  );
  if (!res.ok) {
    throw new Error(`Error calculating expression: ${res.statusText}`);
  }
  return res.json();
}
