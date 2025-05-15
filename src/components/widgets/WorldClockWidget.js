// File: src/components/widgets/WorldClockWidget.js
import React, { useState, useEffect } from 'react';

const DEFAULT_ZONES = ['America/New_York', 'Europe/London', 'Asia/Tokyo'];

export default function WorldClockWidget() {
  const [zones, setZones] = useState(() =>
    JSON.parse(localStorage.getItem('worldClockZones')) || DEFAULT_ZONES
  );
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('worldClockZones', JSON.stringify(zones));
  }, [zones]);

  const handleAddZone = () => {
    const newZone = prompt('Enter IANA time zone (e.g., Europe/Paris):');
    if (newZone && !zones.includes(newZone)) {
      setZones([...zones, newZone]);
    }
  };

  const handleRemoveZone = (zone) => {
    setZones(zones.filter((z) => z !== zone));
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-2 mb-2 overflow-y-auto">
        {zones.map((zone) => (
          <div
            key={zone}
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded"
          >
            <div>
              <div className="font-semibold text-sm">{zone}</div>
              <div className="text-lg font-mono">
                {now.toLocaleTimeString('en-US', { timeZone: zone })}
              </div>
            </div>
            <button
              onClick={() => handleRemoveZone(zone)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddZone}
        className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
      >
        Add Time Zone
      </button>
    </div>
  );
}
