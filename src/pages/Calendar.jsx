// File: src/pages/CalendarPage.jsx
import React, { useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

export default function CalendarPage() {
  const [current, setCurrent] = useState(new Date());

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const year = current.getFullYear();
  const month = current.getMonth();
  const today = new Date();

  // first day index (0=Sun)
  const firstDay = new Date(year, month, 1).getDay();
  // number of days in this month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // build an array of 42 cells (6 weeks)
  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const prevMonth = () => {
    setCurrent(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrent(new Date(year, month + 1, 1));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-200 rounded">
          <FaChevronLeft />
        </button>
        <h2 className="text-xl font-semibold">
          {monthNames[month]} {year}
        </h2>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-200 rounded">
          <FaChevronRight />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-1">
        {daysOfWeek.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={idx}
              className={`
                h-10 flex items-center justify-center 
                rounded 
                ${day ? 'cursor-pointer' : ''}
                ${isToday 
                  ? 'bg-blue-500 text-white' 
                  : 'hover:bg-blue-100'}
              `}
            >
              {day || ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}
