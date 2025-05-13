// File: src/pages/Dashboard.js
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import WeatherWidget from '../components/WeatherWidget';
import DateTimeWidget from '../components/DateTimeWidget';
import EventsWidget from '../components/EventsWidget';
import TasksWidget from '../components/TasksWidget';
import PomodoroWidget from '../components/PomodoroWidget';
import QuoteWidget from '../components/QuoteWidget';
import BriefingWidget from '../components/BriefingWidget';

const DEFAULT_LAYOUT = [
  { i: 'weather',  x: 0, y: 0, w: 4, h: 4 },
  { i: 'datetime', x: 4, y: 0, w: 4, h: 2 },
  { i: 'events',   x: 8, y: 0, w: 4, h: 4 },
  { i: 'tasks',    x: 0, y: 4, w: 4, h: 4 },
  { i: 'pomodoro', x: 4, y: 2, w: 4, h: 3 },
  { i: 'quote',    x: 8, y: 4, w: 4, h: 2 },
  { i: 'briefing', x: 4, y: 5, w: 8, h: 3 },
];

export default function Dashboard() {
  const [layout, setLayout] = useState(
    () => JSON.parse(localStorage.getItem('dashboardLayout')) || DEFAULT_LAYOUT
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Dashboard</h2>
      <DashboardLayout
        layout={layout}
        onLayoutChange={newLayout => {
          setLayout(newLayout);
          localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
        }}
      >
        <div key="weather"><WeatherWidget /></div>
        <div key="datetime"><DateTimeWidget /></div>
        <div key="events"><EventsWidget /></div>
        <div key="tasks"><TasksWidget /></div>
        <div key="pomodoro"><PomodoroWidget /></div>
        <div key="quote"><QuoteWidget /></div>
        <div key="briefing"><BriefingWidget /></div>
      </DashboardLayout>
    </div>
  );
}