import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Link } from 'react-router-dom';
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
    const lg = allLayouts.lg || currentLayout;
    setLayout(lg);
    localStorage.setItem('dashboardLayout', JSON.stringify(lg));
  };

  return (
  <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      layout={layout}               // ensure you pass the current layout
      breakpoints={{ lg: 1200 }}
      cols={{ lg: 12 }}
      rowHeight={30}
      onLayoutChange={onLayoutChange}
      // if your version needs `layout={layout}`, add it here:
      layout={layout}
    >
      {children}
      {React.Children.map(children, (child) => (
        <div
          key={child.key}
          className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded p-4 overflow-auto"
        >
          {child}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
  );
}
