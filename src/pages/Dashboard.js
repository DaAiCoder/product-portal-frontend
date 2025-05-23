// src/pages/Dashboard.js
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

  const savedLayout = JSON.parse(localStorage.getItem('dashboardLayout'));
  const validLayout = Array.isArray(savedLayout)
    ? savedLayout.filter((l) => widgetLibrary.some((w) => w.id === l.i))
    : null;

  const [layout, setLayout] = useState(() =>
    validLayout?.length ? validLayout : defaultLayout
  );
  const [titles, setTitles] = useState(
    () => JSON.parse(localStorage.getItem('widgetTitles')) || {}
  );
  const [favorites, setFavs] = useState(
    () => JSON.parse(localStorage.getItem('widgetFavs')) || {}
  );
  const [hidden, setHidden] = useState(
    () => JSON.parse(localStorage.getItem('widgetHidden')) || []
  );

  // Persist changes
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

  // ◀️ UNHIDE WIDGETS by filtering out any hidden IDs
  const visibleWidgets = widgetLibrary.filter(({ id }) => !hidden.includes(id));

  const pinnedWidgets = visibleWidgets.filter((w) => favorites[w.id]);
  const otherWidgets = visibleWidgets.filter((w) => !favorites[w.id]);

  const renderWidgets = (widgets) =>
    widgets.map(({ id, defaultTitle, Component }) => {
      const widgetLayout = layout.find((l) => l.i === id);
      if (!widgetLayout) return null;
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

      {/* Green “+” button → Widget Library */}
      <Link
        to="/widgets"  {/* swap this if your library route is different */}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        <FaPlus size={24} />
      </Link>
    </div>
  );
}
