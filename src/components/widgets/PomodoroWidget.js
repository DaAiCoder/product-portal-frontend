import React, { useState, useEffect } from 'react';

export default function PomodoroWidget() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () =>
    `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60)
      .toString()
      .padStart(2, '0')}`;

  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <h3 className="text-xl font-semibold mb-2">Stopwatch</h3>
      <p className="text-3xl font-mono">{formatTime()}</p>
      <div className="mt-3 space-x-2">
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
          className="px-4 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
