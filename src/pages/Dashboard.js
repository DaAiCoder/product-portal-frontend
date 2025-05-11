// File: src/pages/Dashboard.js
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import NotesPage from './notes';
import FeedsPage from './feeds';

const DEFAULT_LAYOUT = [
  { i: 'notes', x: 0, y: 0, w: 6, h: 6 },
  { i: 'feeds', x: 6, y: 0, w: 6, h: 6 },
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
        onLayoutChange={(newLayout) => {
          setLayout(newLayout);
          localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
        }}
      >
        <div key="notes">
          <NotesPage />
        </div>
        <div key="feeds">
          <FeedsPage />
        </div>
      </DashboardLayout>
    </div>
  );
}
