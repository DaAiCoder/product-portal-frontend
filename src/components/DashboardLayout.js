// File: src/components/DashboardLayout.js
import React, { useState, useEffect } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const STORAGE_KEY = 'dashboard-layout';

const defaultLayout = [
  { i: 'widget1', x: 0, y: 0, w: 4, h: 2 },
  { i: 'widget2', x: 4, y: 0, w: 4, h: 2 },
  { i: 'widget3', x: 8, y: 0, w: 4, h: 2 },
];

export default function DashboardLayout({ children }) {
  // try load saved, else use default
  const [layout, setLayout] = useState(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultLayout;
  });

  // on every change, persist
  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newLayout));
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768 }}
      cols={{ lg: 12, md: 10, sm: 6 }}
      rowHeight={30}
      onLayoutChange={(layout) => onLayoutChange(layout)}
      draggableHandle=".widget-drag-handle"
    >
      {children}
    </ResponsiveGridLayout>
  );
}
