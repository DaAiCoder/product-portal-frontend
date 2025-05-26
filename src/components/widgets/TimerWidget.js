// src/components/widgets/TimerWidget.js

import React, { useEffect, useState } from 'react';
import {
  listClocks,
  addClock,
  removeClock,
  startTimer,
  stopTimer,
  listTimers,
  clearTimers,
  getTimerRemaining,
} from '../../utils/timerClient'; // <-- Updated import!
import { FaClock, FaHourglassStart, FaStopwatch, FaPlus, FaTrash } from 'react-icons/fa';

export default function TimerWidget({ config = {} }) {
  const { refreshInterval = 60000 } = config;
  const [tab, setTab] = useState('clock'); // 'clock' | 'timer'
  // Clocks
  const [clocks, setClocks] = useState([]);
  const [newCity, setNewCity] = useState('');
  const [newTZ, setNewTZ] = useState('');
  // Timers
  const [timers, setTimers] = useState([]);
  const [timerDuration, setTimerDuration] = useState(1); // minutes

  // Load Clocks
  const loadClocks = async () => {
    try {
      const res = await listClocks();
      setClocks(res.clocks || []);
    } catch (err) {
      console.error('Error loading clocks:', err);
    }
  };

  // Load Timers
  const loadTimers = async () => {
    try {
      const res = await listTimers();
      setTimers(res.timers || []);
    } catch (err) {
      console.error('Error loading timers:', err);
    }
  };

  useEffect(() => {
    if (tab === 'clock') loadClocks();
    if (tab === 'timer') loadTimers();

    const iv = setInterval(() => {
      if (tab === 'clock') loadClocks();
      if (tab === 'timer') loadTimers();
    }, refreshInterval);

    return () => clearInterval(iv);
  }, [tab, refreshInterval]);

  // Renderers
  const renderClock = () => (
    <div>
      <div className="flex mb-2">
        <input
          className="flex-1 p-1 border rounded"
          placeholder="City"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
        />
        <input
          className="flex-1 p-1 border rounded ml-2"
          placeholder="Timezone (e.g. America/Los_Angeles)"
          value={newTZ}
          onChange={(e) => setNewTZ(e.target.value)}
        />
        <button
          onClick={async () => {
            if (!newCity || !newTZ) return;
            await addClock(newCity, newTZ);
            setNewCity('');
            setNewTZ('');
            loadClocks();
          }}
          className="ml-2 p-1 border rounded"
        >
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-1 max-h-32 overflow-y-auto text-sm">
        {clocks.map((c) => (
          <li key={c.city + c.timezone} className="flex justify-between items-center">
            <span>
              {c.city} ({c.timezone}): {c.local_time}
            </span>
            <button
              onClick={async () => {
                await removeClock(c.city);
                loadClocks();
              }}
            >
              <FaTrash className="text-red-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderTimer = () => (
    <div>
      <div className="flex space-x-1 mb-2">
        <input
          type="number"
          min={1}
          className="p-1 w-20 border rounded"
          value={timerDuration}
          onChange={e => setTimerDuration(Number(e.target.value))}
        />
        <span>minutes</span>
        <button
          onClick={async () => {
            await startTimer(timerDuration);
            loadTimers();
          }}
          className="p-1 border rounded"
        >
          Start
        </button>
        <button
          onClick={async () => {
            await stopTimer();
            loadTimers();
          }}
          className="p-1 border rounded"
        >
          Stop
        </button>
        <button
          onClick={async () => {
            await clearTimers();
            loadTimers();
          }}
          className="p-1 border rounded"
        >
          Clear
        </button>
      </div>
      <div className="space-y-1">
        {timers.map((t) => (
          <div key={t.id} className="p-1 bg-gray-100 rounded text-xs">
            Timer: {t.duration} min, ends at {new Date(t.end_time).toLocaleTimeString()}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-2">
      <div className="flex space-x-4 mb-3">
        <button
          onClick={() => setTab('clock')}
          className={tab === 'clock' ? 'font-bold' : 'text-gray-600'}
        >
          <FaClock /> Clock
        </button>
        <button
          onClick={() => setTab('timer')}
          className={tab === 'timer' ? 'font-bold' : 'text-gray-600'}
        >
          <FaHourglassStart /> Timer
        </button>
        {/* Stopwatch removed since backend doesn't support it yet */}
      </div>
      {tab === 'clock' && renderClock()}
      {tab === 'timer' && renderTimer()}
    </div>
  );
}
