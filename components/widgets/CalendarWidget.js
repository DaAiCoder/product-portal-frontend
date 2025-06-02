Product-portal-frontend\src\components\widgets\CalendarWidget.js

import React, { useEffect, useState } from 'react';
import { listEvents } from '../../api/calendarAPI';
import { FaCalendar } from 'react-icons/fa';

export default function CalendarWidget({ config }) {
  const { refreshInterval = 300000 } = config;
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const loadEvents = async () => {
    try {
      // Fetch today's date in YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0];
      const data = await listEvents({ date: today });
      setEvents(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadEvents();
    const iv = setInterval(loadEvents, refreshInterval);
    return () => clearInterval(iv);
  }, [refreshInterval]);

  if (error) return <div className="p-2 text-red-500">Error: {error}</div>;

  return (
    <div className="p-2">
      <div className="flex items-center mb-2">
        <FaCalendar className="mr-1" />
        <strong>Today's Events</strong>
      </div>
      {events.length === 0 ? (
        <div className="text-sm text-gray-500">No events today</div>
      ) : (
        <ul className="text-sm space-y-1 overflow-y-auto max-h-40">
          {events.slice(0, 5).map(ev => (
            <li key={ev.id}>
              <strong>{ev.title}</strong>{' '}
              <span className="text-gray-600">
                at {new Date(ev.datetime || ev.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
