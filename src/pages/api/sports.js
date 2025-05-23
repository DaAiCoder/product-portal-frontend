export default async function handler(req, res) {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const resp = await fetch(
      `https://www.balldontlie.io/api/v1/games?dates[]=${today}`
    );
    const json = await resp.json();
    res.status(200).json({ games: json.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch games" });
  }
}
