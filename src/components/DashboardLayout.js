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
      breakpoints={{ lg: 900, md: 800, sm: 668 }}
      cols={{ lg: 12, md: 10, sm: 6 }}
      rowHeight={30}
      onLayoutChange={onLayoutChange}
      measureBeforeMount
      // enable all compass-point handles for full-direction resizing
       resizeHandles={['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']}
      draggableHandle=".widget-handle"
    >
      {React.Children.map(children, (child) => (
        <div
          key={child.key}
          className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded overflow-hidden flex flex-col"
        >
          <div className="widget-handle bg-gray-100 dark:bg-gray-700 px-2 py-1 cursor-move flex justify-between items-center">
            {child.props.link ? (
              <Link
                to={child.props.link}
                className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                {child.props.title}
              </Link>
            ) : (
              <span className="font-medium">{child.props.title}</span>
            )}
          </div>
          <div className="p-4 flex-1 overflow-auto">{child}</div>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
