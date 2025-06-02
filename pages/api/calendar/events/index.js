// GET all events & POST new event
export default async function handler(req, res) {
  const { method, body } = req;
  const BASE = process.env.CALENDAR_API_URL + '/events';
  const response = await fetch(BASE, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: method === 'GET' ? undefined : JSON.stringify(body),
  });
  const data = await response.json();
  res.status(response.status).json(data);
}
