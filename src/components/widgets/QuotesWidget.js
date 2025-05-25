// File: C:\Users\Rolan\Downloads\Product-portal-frontend\src\components\widgets\QuotesWidget.js

import React, { useEffect, useState } from 'react';
import { getQuote, getQuotesByCategory } from '../../api/quotesAPI';
import { FaQuoteLeft } from 'react-icons/fa';

export default function QuotesWidget({ config }) {
  const { category = '' } = config;
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  const loadQuote = async () => {
    try {
      const data = category
        ? await getQuotesByCategory(category)
        : await getQuote();
      setQuote(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setQuote(null);
    }
  };

  useEffect(() => {
    loadQuote();
  }, [category]);

  return (
    <div className="p-2">
      <div className="flex items-center mb-2">
        <FaQuoteLeft className="mr-1" />
        <strong>Quote{category ? ` (${category})` : ''}</strong>
      </div>
      {error && <div className="text-red-500 text-sm">Error: {error}</div>}
      {quote ? (
        <div className="text-sm">
          “{quote.text}”
          <div className="text-xs text-gray-600 mt-1">
            — {quote.author || 'Unknown'}
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-500">Loading…</div>
      )}
      <button
        onClick={loadQuote}
        className="mt-2 text-xs text-blue-500 hover:underline"
      >
        New Quote
      </button>
    </div>
  );
}
