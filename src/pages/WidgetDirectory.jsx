// src/pages/WidgetDirectory.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const widgets = [
  { id: 'DateTime', name: 'Date & Time', thumbnail: '/thumbnails/datetime.png' },
  { id: 'Weather', name: 'Weather', thumbnail: '/thumbnails/weather.png' },
  // …add your other widget defs
];

export default function WidgetDirectory() {
  const navigate = useNavigate();

  const handleAdd = (widgetId) => {
    // TODO: dispatch action or update layout state to add widgetId
    navigate('/');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Widget Directory</h2>
      <div className="grid grid-cols-3 gap-4">
        {widgets.map((w) => (
          <div
            key={w.id}
            onClick={() => handleAdd(w.id)}
            className="border hover:shadow-md rounded p-4 cursor-pointer"
          >
            <img src={w.thumbnail} alt={w.name} className="mb-2 w-full h-32 object-cover rounded" />
            <h3 className="text-lg font-medium">{w.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
