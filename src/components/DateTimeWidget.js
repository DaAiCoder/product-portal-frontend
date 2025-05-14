import React, { useState, useEffect } from 'react';

export default function DateTimeWidget() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  const handleResetToNow = () => {
    setNow(new Date());
  };

  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <h3 className="text-xl font-semibold mb-2">Local Date & Time</h3>
      <p className="text-lg">{now.toLocaleDateString()}</p>
      <p className="text-2xl font-mono">{now.toLocaleTimeString()}</p>

      <button
        onClick={handleResetToNow}
        className="mt-4 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
      >
        Today
      </button>
    </div>
  );
}
