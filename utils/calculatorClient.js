// src/utils/calculatorClient.js
const BASE = '/api/calculatorAPI';

/** GET /api/calculatorAPI?expr=… */
export async function calculateExpression(expr) {
  const res = await fetch(`${BASE}?expr=${encodeURIComponent(expr)}`);
  if (!res.ok) throw new Error(`Calculation error (${res.status})`);
  return res.json();
}
