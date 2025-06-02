// src/components/widgets/StocksWidget.js

"use client";

import React, { useState, useEffect } from "react";
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function StocksWidget({
  symbols = ["AAPL", "GOOG"],
  crypto = ["bitcoin", "ethereum"],
}) {
  const [data, setData] = useState({ stockData: [], cryptoData: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE}/finance?symbols=${symbols.join(",")}&crypto=${crypto.join(",")}`
        );
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType?.includes("application/json")) {
          throw new Error("Invalid JSON response");
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("StocksWidget error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [symbols.join(","), crypto.join(",")]);

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">Stocks & Crypto</h3>
      {loading ? (
        <p>Loading prices…</p>
      ) : (
        <div className="space-y-2">
          {data.stockData?.map((stock) => (
            <div key={stock.symbol} className="flex justify-between">
              <span>{stock.symbol}</span>
              <span>
                {stock.price?.toFixed(2)} USD ({stock.change?.toFixed(2)}%)
              </span>
            </div>
          ))}
          {data.cryptoData?.map((coin) => (
            <div key={coin.id} className="flex justify-between">
              <span>{coin.id.charAt(0).toUpperCase() + coin.id.slice(1)}</span>
              <span>{coin.price?.toFixed(2)} USD</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
