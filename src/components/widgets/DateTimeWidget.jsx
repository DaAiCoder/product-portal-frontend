// File: src/components/widgets/DateTimeWidget.jsx
import React, { useState, useEffect, useRef } from 'react';

export default function DateTimeWidget() {
  const [now, setNow] = useState(new Date());
  const intervalRef = useRef(null);

  // Update time every second
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Handler for "Today" button
  const handleToday = () => {
    setNow(new Date());
    // If you had any scrollable calendar view,
    // you'd scroll it into view here.
  };

  return (
    <div className="relative h-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded shadow">
      {/* Today button (#3) */}
      <button
        onClick={handleToday}
        className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-2 py-1 rounded"
      >
        Today
      </button>

      {/* Display current time */}
      <div className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        {now.toLocaleTimeString()}
      </div>

      {/* Display current date */}
      <div className="mt-1 text-lg text-gray-600 dark:text-gray-400">
        {now.toLocaleDateString(undefined, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>
    </div>
  );
}
