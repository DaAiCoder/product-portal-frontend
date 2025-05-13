// File: src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import WidgetWrapper from '../components/WidgetWrapper';

// ⚠️ Fixed import path:
import DateTimeWidget from '../components/widgets/DateTimeWidget';

export default function Dashboard() {
  const storedLayout = JSON.parse(localStorage.getItem('dashboardLayout'));
  const [layout, setLayout] = useState(
    storedLayout || [
      { i: 'datetime', x: 0, y: 0, w: 4, h: 4 },
      // …other defaults
    ]
  );
  const [titles, setTitles] = useState({});
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    setTitles(JSON.parse(localStorage.getItem('widgetTitles')) || {});
    setFavorites(JSON.parse(localStorage.getItem('widgetFavs')) || {});
  }, []);

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
  };

  const handleRename = (id, newTitle) => {
    const updated = { ...titles, [id]: newTitle };
    setTitles(updated);
    localStorage.setItem('widgetTitles', JSON.stringify(updated));
  };

  const handleFav = (id) => {
    const updated = { ...favorites, [id]: !favorites[id] };
    setFavorites(updated);
    localStorage.setItem('widgetFavs', JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <GridLayout
        className="layout"
        layout={layout}
        onLayoutChange={onLayoutChange}
        cols={12}
        rowHeight={30}
        width={1200}
        draggableHandle=".drag-handle"
      >
        <div key="datetime">
          <WidgetWrapper
            id="datetime"
            title={titles.datetime || 'Date & Time'}
            onRename={handleRename}
            onToggleFavorite={handleFav}
            loading={false}
          >
            <DateTimeWidget />
          </WidgetWrapper>
        </div>

        {/* …repeat for each widget */}
      </GridLayout>
    </div>
  );
}
