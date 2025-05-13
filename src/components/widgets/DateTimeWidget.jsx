// src/widgets/DateTimeWidget.jsx
import React, { useRef } from 'react';
import { FaClock } from 'react-icons/fa';

export default function DateTimeWidget() {
  const containerRef = useRef();

  const handleToday = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="relative h-full" ref={containerRef}>
      <button
        onClick={handleToday}
        className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-1 rounded"
        aria-label="Today"
      >
        <FaClock />
      </button>
      <div className="p-4">
        {/* Your date/time display logic here */}
      </div>
    </div>
  );
}
