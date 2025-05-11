// File: src/components/DashboardLayout.js
import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);

const DEFAULT_LAYOUT = [
  { i: 'notes', x: 0, y: 0, w: 6, h: 6 },
  { i: 'feeds', x: 6, y: 0, w: 6, h: 6 },
];

export default function DashboardLayout({ children }) {
  const [layout, setLayout] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dashboardLayout')) || DEFAULT_LAYOUT;
    } catch {
      return DEFAULT_LAYOUT;
    }
  });

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200 }}
      cols={{ lg: 12 }}
      rowHeight={30}
      onLayoutChange={onLayoutChange}
      // if your version needs `layout={layout}`, add it here:
      layout={layout}
    >
      {children}
    </ResponsiveGridLayout>
  );
}
