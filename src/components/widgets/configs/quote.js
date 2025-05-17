import React from 'react';

const sampleQuotes = [
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Life is what happens when you're busy making other plans. – John Lennon",
  "Do or do not. There is no try. – Yoda",
];

export default function QuoteWidget() {
  const quote = sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
  return (
    <div className="h-full flex flex-col justify-center items-center p-4">
      <h3 className="text-xl font-semibold mb-2">Inspirational Quote</h3>
      <p className="italic text-center">"{quote}"</p>
    </div>
  );
}
