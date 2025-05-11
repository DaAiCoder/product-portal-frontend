import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DEFAULT_LAYOUT = [
  { i: 'notes', x: 0, y: 0, w: 6, h: 6 },
  { i: 'feeds', x: 6, y: 0, w: 6, h: 6 },
];

export default function DashboardLayout({ children }) {
  // load from localStorage or fall back
  const [layout, setLayout] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dashboardLayout')) || DEFAULT_LAYOUT;
    } catch {
      return DEFAULT_LAYOUT;
    }
  });

  // whenever layout changes, persist it
  const onLayoutChange = (currentLayout, allLayouts) => {
    const lgLayout = allLayouts.lg || currentLayout;
    setLayout(lgLayout);
    localStorage.setItem('dashboardLayout', JSON.stringify(lgLayout));
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200 }}
      cols={{ lg: 12 }}
      rowHeight={30}
      onLayoutChange={onLayoutChange}
      measureBeforeMount
      draggableHandle=".widget-handle"
    >
      {React.Children.map(children, (child) => (
        <div
          key={child.key}
          className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded overflow-hidden flex flex-col"
        >
          {/* optional drag handle */}
          <div className="widget-handle bg-gray-100 dark:bg-gray-700 px-2 py-1 cursor-move">
            {child.props.title}
          </div>
          <div className="p-4 flex-1 overflow-auto">{child}</div>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}

