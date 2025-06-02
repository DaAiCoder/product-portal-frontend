import React from 'react';

export default function TasksWidget() {
  return (
    <div className="h-full flex flex-col p-4">
      <h3 className="text-xl font-semibold mb-2">Today's Tasks</h3>
      <ul className="list-decimal list-inside text-gray-600">
        <li>Task A</li>
        <li>Task B</li>
        <li>Task C</li>
      </ul>
    </div>
  );
}
