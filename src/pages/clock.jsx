// File: src/pages/clock.jsx
import React, { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="p-6 text-center text-2xl font-mono text-gray-800 dark:text-gray-200">
      🕒 {time.toLocaleTimeString()}
    </div>
  );
}
