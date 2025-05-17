import React from 'react';

export default function WeatherWidget() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h3 className="text-xl font-semibold mb-2">7-Day Weather</h3>
      <p>Loading weather…</p>
    </div>
  );
}
