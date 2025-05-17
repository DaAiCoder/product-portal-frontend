import React from 'react';

function WeatherWidget() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h3 className="text-xl font-semibold mb-2">7-Day Weather</h3>
      <p>Loading weather…</p>
    </div>
  );
}

export default {
  id: 'weather',
  defaultTitle: '7-Day Weather',
  defaultW: 4,
  defaultH: 4,
  Component: WeatherWidget,
};
