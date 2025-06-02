Product-portal-frontend\src\components\widgets\ReminderWidget.js

import React, { useEffect, useState } from 'react';
import {
  listReminders,
  snoozeReminder,
  cancelReminder,
} from '../../api/reminderAPI';
import { FaBell } from 'react-icons/fa';

export default function ReminderWidget({ config }) {
  const { refreshInterval = 300000 } = config;
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState(null);

  const loadReminders = async () => {
    try {
      const data = await listReminders();
      setReminders(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadReminders();
    const iv = setInterval(loadReminders, refreshInterval);
    return () => clearInterval(iv);
  }, [refreshInterval]);

  if (error) return <div className="p-2 text-red-500">Error: {error}</div>;

  return (
    <div className="p-2">
      <div className="flex items-center mb-2">
        <FaBell className="mr-1" />
        <strong>Reminders</strong>
      </div>
      {reminders.length === 0 ? (
        <div className="text-sm text-gray-500">No upcoming reminders</div>
      ) : (
        <ul className="text-sm space-y-1 overflow-y-auto max-h-40">
          {reminders.slice(0, 5).map((r) => (
            <li key={r.id} className="flex justify-between items-center">
              <span className="truncate">{r.text} at {new Date(r.datetime).toLocaleString()}</span>
              <div className="flex space-x-1">
                <button
                  onClick={() => snoozeReminder(r.id, { minutes: 10 }).then(loadReminders)}
                  title="Snooze 10m"
                  className="text-xs text-blue-500"
                >
                  Snooze
                </button>
                <button
                  onClick={() => cancelReminder(r.id).then(loadReminders)}
                  title="Cancel"
                  className="text-xs text-red-500"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
