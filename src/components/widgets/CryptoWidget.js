// File: src/components/widgets/CryptoWidget.js

import React, { useEffect, useState } from 'react';
import {
  getCryptoPrice,
  getCryptoHistory,
  alertCryptoThreshold,
} from '../../api/cryptoAPI';
import { FaBitcoin } from 'react-icons/fa';

export default function CryptoWidget({ config }) {
  const {
    symbols = ['BTC', 'ETH', 'DOGE'],
    refreshInterval = 300000, // default 5 minutes
    showHistory = false,
  } = config;

  const [prices, setPrices] = useState({});
  const [history, setHistory] = useState({});
  const [error, setError] = useState(null);

  const loadPrices = async () => {
    try {
      const entries = await Promise.all(
        symbols.map((s) =>
          getCryptoPrice(s).then((r) => [s, r.price])
        )
      );
      setPrices(Object.fromEntries(entries));
    } catch (err) {
      setError(err.message);
    }
  };

  const loadHistory = async () => {
    try {
      const hist = {};
      for (const s of symbols) {
        hist[s] = await getCryptoHistory(s);
      }
      setHistory(hist);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadPrices();
    if (showHistory) loadHistory();
    const iv = setInterval(() => {
      loadPrices();
      if (showHistory) loadHistory();
    }, refreshInterval);
    return () => clearInterval(iv);
  }, [symbols, refreshInterval, showHistory]);

  if (error) {
    return <div className="p-2 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-2">
      <div className="flex items-center mb-2">
        <FaBitcoin className="mr-1" />
        <strong>Crypto Prices</strong>
      </div>
      <ul className="text-sm space-y-1">
        {symbols.map((s) => (
          <li key={s}>
            <strong>{s}</strong>: ${prices[s]?.toFixed(2) ?? '…'}
          </li>
        ))}
      </ul>
      {showHistory && (
        <>
          <div className="mt-3 text-xs font-semibold">History (last few):</div>
          {symbols.map((s) => (
            <div key={s} className="mt-1 text-xs">
              <strong>{s}:</strong>{' '}
              {(history[s] || [])
                .slice(-5)
                .map((p) => `${p.date}:${p.price.toFixed(2)}`)
                .join(', ')}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
