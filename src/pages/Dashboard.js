import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

// same default positions you configured in DashboardLayout
const DEFAULT_LAYOUT = [
  { i: 'notes', x: 0, y: 0, w: 6, h: 6 },
  { i: 'feeds', x: 6, y: 0, w: 6, h: 6 },
];

export default function Dashboard() {
  const [layout, setLayout] = useState(DEFAULT_LAYOUT);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Dashboard</h2>
      <DashboardLayout
        layout={layout}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
      />
    </div>
  );
}
