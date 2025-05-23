export default async function handler(req, res) {
  const { symbols = "", crypto = "" } = req.query;
  let stockData = [];
  let cryptoData = [];

  if (symbols) {
    const stockRes = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`
    );
    const stockJson = await stockRes.json();
    stockData = stockJson.quoteResponse.result.map((item) => ({
      symbol: item.symbol,
      price: item.regularMarketPrice,
      change: item.regularMarketChangePercent,
    }));
  }

  if (crypto) {
    const cryptoRes = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`
    );
    const cryptoJson = await cryptoRes.json();
    cryptoData = Object.entries(cryptoJson).map(([id, data]) => ({
      id,
      price: data.usd,
    }));
  }

  res.status(200).json({ stockData, cryptoData });
}
