// File: src/pages/dashboard.js
import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import WidgetWrapper from '../components/WidgetWrapper';
import WidgetSettingsPanel from '../components/WidgetSettingsPanel';
import { widgetLibrary } from '../utils/widgetLibrary';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default function Dashboard() {
  const defaultLayout = widgetLibrary.map((w, i) => ({
    i: w.id,
    x: (i * w.defaultW) % 12,
    y: Math.floor((i * w.defaultW) / 12) * w.defaultH,
    w: w.defaultW,
    h: w.defaultH,
  }));

  const [layout, setLayout] = useState(() =>
    JSON.parse(localStorage.getItem('dashboardLayout')) || defaultLayout
  );
  const [titles, setTitles] = useState(() =>
    JSON.parse(localStorage.getItem('widgetTitles')) || {}
  );
  const [favorites, setFavs] = useState(() =>
    JSON.parse(localStorage.getItem('widgetFavs')) || {}
  );
  const [hidden, setHidden] = useState(() =>
    JSON.parse(localStorage.getItem('widgetHidden')) || []
  );

  useEffect(() => localStorage.setItem('dashboardLayout', JSON.stringify(layout)), [layout]);
  useEffect(() => localStorage.setItem('widgetTitles', JSON.stringify(titles)), [titles]);
  useEffect(() => localStorage.setItem('widgetFavs', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('widgetHidden', JSON.stringify(hidden)), [hidden]);

  const onLayoutChange = (newLayout) => setLayout(newLayout);
  const handleRename = (id, newTitle) => setTitles((t) => ({ ...t, [id]: newTitle }));
  const handleFav = (id) => setFavs((f) => ({ ...f, [id]: !f[id] }));
  const handleHide = (id) => setHidden((h) => Array.from(new Set([...h, id])));

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsWidgetId, setSettingsWidgetId] = useState(null);
  const handleOpenSettings = (id) => {
    setSettingsWidgetId(id);
    setSettingsOpen(true);
  };

  const visibleWidgets = widgetLibrary.filter((w) => w.Component && !hidden.includes(w.id));
  const pinnedWidgets = visibleWidgets.filter((w) => favorites[w.id]);
  const otherWidgets = visibleWidgets.filter((w) => !favorites[w.id]);

  const renderWidgets = (widgets) =>
    widgets.map(({ id, defaultTitle, Component }) => {
      if (typeof Component !== 'function') {
        console.warn(`❌ Skipping widget "${id}" — invalid or missing component`);
        return null;
      }

      const widgetLayout = layout.find((l) => l.i === id);
      if (!widgetLayout) {
        console.warn(`⚠️ Missing layout for widget "${id}"`);
        return null;
      }

      return (
        <div key={id} data-grid={widgetLayout}>
          <WidgetWrapper
            id={id}
            title={titles[id] || defaultTitle}
            loading={false}
            favorite={Boolean(favorites[id])}
            onRename={handleRename}
            onToggleFavorite={handleFav}
            onHide={handleHide}
            showSettings={true}
            onOpenSettings={handleOpenSettings}
          >
            <Component />
          </WidgetWrapper>
        </div>
      );
    });

  return (
    <div className="p-6 relative">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={onLayoutChange}
        draggableHandle=".drag-handle"
        isResizable
      >
        {renderWidgets(pinnedWidgets)}
        {renderWidgets(otherWidgets)}
      </GridLayout>

      <WidgetSettingsPanel
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        widgetId={settingsWidgetId}
      />

      <Link
        to="/widgets"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        <FaPlus size={24} />
      </Link>
    </div>
  );
}
