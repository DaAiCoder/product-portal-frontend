// File: src/components/DashboardLayout.js
import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Link } from 'react-router-dom';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const TITLE_MAP = {
  notes: 'Notes',
  feeds: 'Feeds',
};

export default function DashboardLayout({ layout, onLayoutChange, children }) {
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      // for older versions of RGL, you may need both:
      layout={layout}
      breakpoints={{ lg: 1200 }}
      cols={{ lg: 12 }}
      rowHeight={30}
      onLayoutChange={onLayoutChange}
    >
      {React.Children.map(children, (child) => {
        const key = child.key;
        const title = TITLE_MAP[key] || key;
        return (
          <div
            key={key}
            className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded flex flex-col"
          >
            <div className="flex justify-between items-center border-b dark:border-gray-700 px-3 py-2">
              <span className="font-semibold text-lg">{title}</span>
              <Link
                to={`/${key}`}
                className="text-blue-600 hover:underline text-sm"
              >
                View
              </Link>
            </div>
            <div className="p-3 flex-1 overflow-auto">
              {child}
            </div>
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
}

