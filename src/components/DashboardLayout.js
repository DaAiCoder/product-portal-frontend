// File: src/components/DashboardLayout.js
import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

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

  const onLayoutChange = (currentLayout, allLayouts) => {
    // for non-responsive use currentLayout, otherwise pick the 'lg' size
    const newLayout = allLayouts.lg || currentLayout;
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
      resizeHandles={['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']}
      onLayoutChange={onLayoutChange}
    >
      {React.Children.map(children, (child) => (
        <div
          key={child.props.id}
          className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded p-4 overflow-auto"
        >
          {child}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
