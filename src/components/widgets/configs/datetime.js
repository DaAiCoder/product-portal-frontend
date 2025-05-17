import React, { useState, useEffect } from 'react';

function DateTimeWidget() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <h3 className="text-xl font-semibold mb-2">Local Date & Time</h3>
      <p className="text-lg">{now.toLocaleDateString()}</p>
      <p className="text-2xl font-mono">{now.toLocaleTimeString()}</p>
    </div>
  );
}

export default {
  id: 'datetime',
  defaultTitle: 'Date & Time',
  defaultW: 4,
  defaultH: 4,
  Component: DateTimeWidget,
};
