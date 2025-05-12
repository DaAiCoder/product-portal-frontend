import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        {/* Notes Widget */}
        <div key="notes" className="flex flex-col bg-white dark:bg-gray-800 p-4 rounded shadow h-full">
          <h3 className="text-lg font-semibold mb-2">Notes</h3>
          <div className="flex-grow overflow-auto">
            <NotesPage />
          </div>
          {/* VIEW: links to /notes */}
          <Link
            to="/notes"
            className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            View Notes
          </Link>
        </div>

        {/* Feeds Widget */}
        <div key="feeds" className="flex flex-col bg-white dark:bg-gray-800 p-4 rounded shadow h-full">
          <h3 className="text-lg font-semibold mb-2">Feeds</h3>
          <div className="flex-grow overflow-auto">
            <FeedsPage />
          </div>
          {/* VIEW: links to /feeds */}
          <Link
            to="/feeds"
            className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            View Feeds
          </Link>
        </div>
      </DashboardLayout>
    </div>
  );
}
