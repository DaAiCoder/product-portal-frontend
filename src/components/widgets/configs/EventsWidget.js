import React from 'react';

export default function EventsWidget() {
  return (
    <div className="h-full flex flex-col p-4">
      <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
      <ul className="list-disc list-inside text-gray-600">
        <li>Event 1 (TBD)</li>
        <li>Event 2 (TBD)</li>
        <li>Event 3 (TBD)</li>
      </ul>
    </div>
  );
}
