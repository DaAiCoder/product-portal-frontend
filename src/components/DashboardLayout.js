import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardLayout({ layout, onLayoutChange, children }) {
  // Map our layout items to breakpoints—here we use one responsive size
  const layouts = { lg: layout };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200 }}
      cols={{ lg: 12 }}
      rowHeight={30}
      // Enable dragging & resizing
      isDraggable={true}
      isResizable={true}
      // Persist new layout on change
      onLayoutChange={(curr, all) => onLayoutChange(all.lg)}
      // Use .drag-handle as the handle
      draggableHandle=".drag-handle"
      measureBeforeMount={false}
      useCSSTransforms={true}
    >
      {React.Children.map(children, child => (
        <div key={child.key} className="bg-white dark:bg-gray-800 border rounded shadow overflow-hidden">
          {/* Drag handle */}
          <div className="drag-handle bg-gray-100 dark:bg-gray-700 px-2 py-1 cursor-move">
            {/* You can inject a title here if desired */}
          </div>
          <div className="p-2 h-full overflow-auto">
            {child}
          </div>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}

