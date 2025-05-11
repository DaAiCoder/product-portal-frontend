// File: src/components/DashboardLayout.js
import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Link } from 'react-router-dom';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

// fallback positions if nothing in localStorage yet
const DEFAULT_LAYOUT = [
  { i: 'notes', x: 0, y: 0, w: 6, h: 6 },
  { i: 'feeds', x: 6, y: 0, w: 6, h: 6 },
];

// human‐readable titles for each widget
const WIDGET_TITLES = {
  notes: 'Your Notes',
  feeds: 'News Feed',
};

export default function DashboardLayout({
  // initial layout from parent (you pass this down from Dashboard.js)
  layout: initialLayout = DEFAULT_LAYOUT,
  onLayoutChange: parentOnLayoutChange,
  children,
}) {
  // merge parent initialLayout and persisted layout
  const [layout, setLayout] = useState(() => {
    const saved = localStorage.getItem('dashboardLayout');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore parse errors
      }
    }
    return initialLayout;
  });

  function handleLayoutChange(newLayout) {
    setLayout(newLayout);
    localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
    if (parentOnLayoutChange) parentOnLayoutChange(newLayout);
  }

  // turn children array into an object by key for easy lookup
  const keyedChildren = React.Children.toArray(children).reduce((acc, child) => {
    if (child.key) acc[child.key] = child;
    return acc;
  }, {});

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200 }}
      cols={{ lg: 12 }}
      rowHeight={30}
      onLayoutChange={handleLayoutChange}
      // allow resize in both directions
      isResizable={true}
      isDraggable={true}
    >
      {layout.map((item) => (
        <div
          key={item.i}
          data-grid={item}
          className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded flex flex-col overflow-hidden"
        >
          {/* header with a link */}
          <div className="px-3 py-2 border-b dark:border-gray-700 bg-gray-100 dark:bg-gray-900 flex justify-between items-center">
            <Link
              to={`/${item.i}`}
              className="font-bold text-gray-800 dark:text-gray-200 hover:underline"
            >
              {WIDGET_TITLES[item.i] || item.i}
            </Link>
          </div>
          {/* body */}
          <div className="p-4 flex-1 overflow-auto">
            {keyedChildren[item.i] || null}
          </div>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}

