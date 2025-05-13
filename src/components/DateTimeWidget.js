import React, { useState, useEffect } from 'react';

export default function DateTimeWidget() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h3 className="text-xl font-semibold mb-2">Local Date & Time</h3>
      <p>{now.toLocaleDateString()}</p>
      <p>{now.toLocaleTimeString()}</p>
    </div>
  );
}
