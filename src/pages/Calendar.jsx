// src/pages/Calendar.jsx
import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subMonths,
  addMonths,
} from 'date-fns';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart   = startOfMonth(currentMonth);
  const monthEnd     = endOfMonth(monthStart);
  const startDate    = startOfWeek(monthStart);
  const endDate      = endOfWeek(monthEnd);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={prevMonth}
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        &lt;
      </button>
      <h2 className="text-xl font-semibold">
        {format(currentMonth, 'MMMM yyyy')}
      </h2>
      <button
        onClick={nextMonth}
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        &gt;
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEEEEE';
    const start = startOfWeek(monthStart);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium text-gray-700">
          {format(addDays(start, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const rows = [];
    let days = [];
    let day  = startDate;
    const dateFormat = 'd';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isCurrentMonth = day.getMonth() === monthStart.getMonth();
        days.push(
          <div
            key={day}
            className={`h-20 border p-1 ${
              isCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400'
            }`}
          >
            <span className="text-sm">{format(day, dateFormat)}</span>
            {/* Placeholder for events */}
            <div className="mt-1 text-xs text-blue-500">
              {/* e.g. Event 1 */}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={day} className="grid grid-cols-7">{days}</div>);
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Calendar</h1>
      <div className="bg-white shadow rounded p-4">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
}
