// File: src/components/widgets/TimerWidget.js

import React, { useEffect, useState } from 'react';
import {
  listClocks,
  addClock,
  removeClock,
  getTimeInZone,
  startTimer,
  stopTimer,
  listTimers,
  clearTimers,
  startStopwatch,
  stopStopwatch,
  resetStopwatch,
  lapStopwatch,
  getStopwatchTime,
} from '../../pages/api/timerAPI';
import { FaClock, FaHourglassStart, FaStopwatch, FaPlus, FaTrash } from 'react-icons/fa';

export default function TimerWidget({ config = {} }) {
  // default config, so config.refreshInterval never blows up
  const { refreshInterval = 60000 } = config;
  const [tab, setTab] = useState('clock'); // 'clock' | 'timer' | 'stopwatch'

  // World Clock state
  const [clocks, setClocks] = useState([]);
  const [newTZ, setNewTZ] = useState('');

  // Timer state
  const [timers, setTimers] = useState([]);

  // Stopwatch state
  const [swTime, setSwTime] = useState(null);
  const [swLaps, setSwLaps] = useState([]);

  // Fetch data helpers
  const loadClocks = async () => {
    try {
      const list = await listClocks();
      const withTimes = await Promise.all(
        list.map(async (c) => {
          const { datetime } = await getTimeInZone(c.timezone);
          return { ...c, datetime };
        })
      );
      setClocks(withTimes);
    } catch (err) {
      console.error('Error loading clocks:', err);
    }
  };
  const loadTimers = async () => {
    try {
      const t = await listTimers();
      setTimers(t);
    } catch (err) {
      console.error('Error loading timers:', err);
    }
  };
  const loadStopwatch = async () => {
    try {
      const data = await getStopwatchTime();
      setSwTime(data.time);
      setSwLaps(data.laps || []);
    } catch (err) {
      console.error('Error loading stopwatch:', err);
    }
  };

  // Initial load & polling
  useEffect(() => {
    if (tab === 'clock') loadClocks();
    if (tab === 'timer') loadTimers();
    if (tab === 'stopwatch') loadStopwatch();

    const iv = setInterval(() => {
      if (tab === 'clock') loadClocks();
      if (tab === 'timer') loadTimers();
      if (tab === 'stopwatch') loadStopwatch();
    }, refreshInterval);

    return () => clearInterval(iv);
  }, [tab, refreshInterval]);

  // Renderers for each mode
  const renderClock = () => (
    <div>
      <div className="flex mb-2">
        <input
          className="flex-1 p-1 border rounded"
          placeholder="America/New_York"
          value={newTZ}
          onChange={(e) => setNewTZ(e.target.value)}
        />
        <button
          onClick={async () => {
            await addClock(newTZ);
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
          <li key={c.id} className="flex justify-between items-center">
            <span>
              {c.timezone}: {new Date(c.datetime).toLocaleTimeString()}
            </span>
            <button
              onClick={async () => {
                await removeClock(c.id);
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
        {timers.map((t) => (
          <div key={t.id} className="p-1 bg-gray-100 rounded text-xs">
            {t.remaining}s
          </div>
        ))}
      </div>
      <div className="flex space-x-1">
        <button
          onClick={async () => {
            await startTimer(60);
            loadTimers();
          }}
          className="p-1 border rounded"
        >
          Start 1m
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
    </div>
  );

  const renderStopwatch = () => (
    <div>
      <div className="text-lg mb-2">{swTime != null ? `${swTime}s` : '0s'}</div>
      <div className="flex space-x-1 mb-2">
        <button
          onClick={async () => {
            await startStopwatch();
            loadStopwatch();
          }}
          className="p-1 border rounded"
        >
          Start
        </button>
        <button
          onClick={async () => {
            await stopStopwatch();
            loadStopwatch();
          }}
          className="p-1 border rounded"
        >
          Stop
        </button>
        <button
          onClick={async () => {
            await resetStopwatch();
            loadStopwatch();
          }}
          className="p-1 border rounded"
        >
          Reset
        </button>
        <button
          onClick={async () => {
            await lapStopwatch();
            loadStopwatch();
          }}
          className="p-1 border rounded"
        >
          Lap
        </button>
      </div>
      <ul className="text-xs space-y-1 max-h-24 overflow-y-auto">
        {swLaps.map((lap, i) => (
          <li key={i}>
            Lap {i + 1}: {lap}s
          </li>
        ))}
      </ul>
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
        <button
          onClick={() => setTab('stopwatch')}
          className={tab === 'stopwatch' ? 'font-bold' : 'text-gray-600'}
        >
          <FaStopwatch /> Stopwatch
        </button>
      </div>
      {tab === 'clock' && renderClock()}
      {tab === 'timer' && renderTimer()}
      {tab === 'stopwatch' && renderStopwatch()}
    </div>
  );
}
