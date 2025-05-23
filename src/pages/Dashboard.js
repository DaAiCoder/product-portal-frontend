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
  // 1) Build a default layout from your widgetLibrary
  const defaultLayout = widgetLibrary.map((w, i) => ({
    i: w.id,
    x: (i * w.w) % 12,
    y: Math.floor((i * w.w) / 12) * w.h,
    w: w.w,
    h: w.h,
  }));

  // 2) Try to load any saved layout; otherwise fall back to default
  const saved = localStorage.getItem('dashboardLayout');
  const savedLayout = saved ? JSON.parse(saved) : null;
  const validLayout = Array.isArray(savedLayout)
    ? savedLayout.filter((l) => widgetLibrary.some((w) => w.id === l.i))
    : null;

  const [layout, setLayout] = useState(validLayout?.length ? validLayout : defaultLayout);
  const [titles, setTitles] = useState(() =>
    JSON.parse(localStorage.getItem('widgetTitles') || '{}')
  );
  const [favorites, setFavs] = useState(() =>
    JSON.parse(localStorage.getItem('widgetFavs') || '{}')
  );
  const [hidden, setHidden] = useState(() =>
    JSON.parse(localStorage.getItem('widgetHidden') || '[]')
  );

  // Persist to localStorage on changes
  useEffect(() => localStorage.setItem('dashboardLayout', JSON.stringify(layout)), [layout]);
  useEffect(() => localStorage.setItem('widgetTitles', JSON.stringify(titles)), [titles]);
  useEffect(() => localStorage.setItem('widgetFavs', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('widgetHidden', JSON.stringify(hidden)), [hidden]);

  // Handlers
  const onLayoutChange = (newLayout) => setLayout(newLayout);
  const handleRename = (id, newTitle) => setTitles((t) => ({ ...t, [id]: newTitle }));
  const handleFav = (id) => setFavs((f) => ({ ...f, [id]: !f[id] }));
  const handleHide = (id) => setHidden((h) => Array.from(new Set([...h, id])));

  // Settings panel state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsWidgetId, setSettingsWidgetId] = useState(null);
  const handleOpenSettings = (id) => {
    setSettingsWidgetId(id);
    setSettingsOpen(true);
  };

  // Filter out hidden widgets
  const visibleWidgets = widgetLibrary.filter((w) => !hidden.includes(w.id));
  const pinnedWidgets = visibleWidgets.filter((w) => favorites[w.id]);
  const otherWidgets = visibleWidgets.filter((w) => !favorites[w.id]);

  // Render helper
  const renderWidgets = (list) =>
    list.map(({ id, title, component: Component }) => {
      const cfg = layout.find((l) => l.i === id);
      if (!cfg) return null;
      return (
        <div key={id} data-grid={cfg}>
          <WidgetWrapper
            id={id}
            title={titles[id] || title}
            loading={false}
            favorite={!!favorites[id]}
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

      {/* Green “+” button to open your widget library */}
      <Link
        to="/widgets"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        <FaPlus size={24} />
      </Link>
    </div>
  );
}
