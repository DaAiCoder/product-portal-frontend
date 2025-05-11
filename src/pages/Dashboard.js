// File: src/pages/Dashboard.js
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Dashboard</h2>
      <DashboardLayout>
        <div key="notes">
          <h3 className="font-semibold mb-2">Notes</h3>
          {/* …your notes widget content… */}
        </div>
        <div key="feeds">
          <h3 className="font-semibold mb-2">Feeds</h3>
          {/* …your feeds widget content… */}
        </div>
      </DashboardLayout>
    </div>
  );
}
