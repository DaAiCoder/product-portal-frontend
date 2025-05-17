// File: src/components/widgets/WorldClockWidget.js
import React, { useState, useEffect } from 'react';

const DEFAULT_ZONES = ['America/New_York', 'Europe/London', 'Asia/Tokyo'];
const COMMON_ZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Kolkata',
  'Australia/Sydney',
  'Africa/Lagos',
];

export default function WorldClockWidget() {
  const [zones, setZones] = useState(() =>
    JSON.parse(localStorage.getItem('worldClockZones')) || DEFAULT_ZONES
  );
  const [newZone, setNewZone] = useState('');
  const [now, setNow] = useState(new Date());
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('worldClockZones', JSON.stringify(zones));
  }, [zones]);

  const handleAddZone = () => {
    if (!newZone) return;
    if (zones.includes(newZone)) {
      setError('Zone already added.');
      return;
    }
    try {
      new Intl.DateTimeFormat('en-US', { timeZone: newZone }).format(); // Validate zone
      setZones([...zones, newZone]);
      setNewZone('');
      setError('');
    } catch {
      setError('Invalid time zone.');
    }
  };

  const handleRemoveZone = (zone) => {
    setZones(zones.filter((z) => z !== zone));
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-2 mb-3 overflow-y-auto max-h-64">
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

      <div className="mt-2 space-y-2">
        <select
          value={newZone}
          onChange={(e) => {
            setNewZone(e.target.value);
            setError('');
          }}
          className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select a time zone</option>
          {COMMON_ZONES.filter((z) => !zones.includes(z)).map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddZone}
          className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
        >
          Add Time Zone
        </button>
        {error && <div className="text-red-500 text-xs">{error}</div>}
      </div>
    </div>
  );
}
