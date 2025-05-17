import React, { useState, useEffect } from 'react';

export default function PomodoroWidget() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let iv;
    if (running) iv = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(iv);
  }, [running]);
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h3 className="text-xl font-semibold mb-2">Spotwatch</h3>
      <p className="text-2xl">{Math.floor(seconds/60).toString().padStart(2,'0')}:{(seconds%60).toString().padStart(2,'0')}</p>
      <button
        onClick={() => setRunning(r => !r)}
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
      >
        {running ? 'Pause' : 'Start'}
      </button>
    </div>
  );
}
