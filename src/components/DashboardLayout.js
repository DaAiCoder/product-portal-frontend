import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import NotesWidget from './widgets/NotesWidget';
import FeedsWidget from './widgets/FeedsWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardLayout({ layout, onLayoutChange }) {
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768 }}
      cols={{ lg: 12, md: 10, sm: 6 }}
      rowHeight={30}
      onLayoutChange={(_, allLayouts) => {
        // pass only the lg layout back up
        onLayoutChange(allLayouts.lg);
      }}
    >
      <div key="notes" data-grid={{ x: 0, y: 0, w: 6, h: 6 }}>
        <NotesWidget />
      </div>
      <div key="feeds" data-grid={{ x: 6, y: 0, w: 6, h: 6 }}>
        <FeedsWidget />
      </div>
    </ResponsiveGridLayout>
  );
}
