// File: src/components/widgets/QuoteWidget.js

import React, { useEffect, useState } from 'react';
import { getQuote } from '../../utils/quotesClient';
import { FaQuoteRight } from 'react-icons/fa';

export default function QuoteWidget({ config = {} }) {
  const { topic = '' } = config;
  const [quoteData, setQuoteData] = useState({ text: '', author: '' });

  const loadQuote = async () => {
    try {
      const data = await getQuote(topic);
      // Normalize response fields in case of different API shapes
      setQuoteData({
        text: data.quote || data.text || '',
        author: data.author || data.source || 'Unknown',
      });
    } catch (err) {
      console.error('Error loading quote:', err);
    }
  };

  useEffect(() => {
    loadQuote();
  }, [topic]);

  return (
    <div className="p-2 flex flex-col items-center text-center">
      <FaQuoteRight size={40} className="mb-2 text-gray-600" />
      <p className="italic mb-2">"{quoteData.text}"</p>
      <p className="text-sm text-gray-500">— {quoteData.author}</p>
      <button
        onClick={loadQuote}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
      >
        New Quote
      </button>
    </div>
  );
}
