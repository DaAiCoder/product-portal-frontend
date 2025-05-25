import Parser from "rss-parser";

const parser = new Parser();

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Missing url param" });
  }
  try {
    const feed = await parser.parseURL(url);
    const items = feed.items.slice(0, 5).map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
    }));
    res.status(200).json({ title: feed.title, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch RSS feed" });
  }
}
