// File: src/pages/Dashboard.js
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div key="widget1" className="bg-white p-4 shadow rounded">
        <div className="widget-drag-handle cursor-move font-bold">Widget 1</div>
        <p>Some content...</p>
      </div>
      <div key="widget2" className="bg-white p-4 shadow rounded">
        <div className="widget-drag-handle cursor-move font-bold">Widget 2</div>
        <p>More content...</p>
      </div>
      <div key="widget3" className="bg-white p-4 shadow rounded">
        <div className="widget-drag-handle cursor-move font-bold">Widget 3</div>
        <p>Even more content...</p>
      </div>
    </DashboardLayout>
  );
}
