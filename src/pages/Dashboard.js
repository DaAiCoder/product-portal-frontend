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
  // Build the default layout from widgetLibrary
  const defaultLayout = widgetLibrary.map((w, i) => ({
    i: w.id,
    x: (i * w.w) % 12,
    y: Math.floor((i * w.w) / 12) * w.h,
    w: w.w,
    h: w.h,
  }));

  // Load saved layout (if any) and merge with defaults
  const savedRaw = localStorage.getItem('dashboardLayout');
  let savedLayout = [];
  try {
    savedLayout = savedRaw ? JSON.parse(savedRaw) : [];
  } catch {
    savedLayout = [];
  }

  const mergedLayout = defaultLayout.map((def) => {
    const match = savedLayout.find((s) => s.i === def.i);
    return match || def;
  });

  const [layout, setLayout] = useState(mergedLayout);
  const [titles, setTitles] = useState(() =>
    JSON.parse(localStorage.getItem('widgetTitles') || '{}')
  );
  const [favorites, setFavs] = useState(() =>
    JSON.parse(localStorage.getItem('widgetFavs') || '{}')
  );
  const [hidden, setHidden] = useState(() =>
    JSON.parse(localStorage.getItem('widgetHidden') || '[]')
  );

  // Persist state
  useEffect(() => {
    localStorage.setItem('dashboardLayout', JSON.stringify(layout));
  }, [layout]);
  useEffect(() => {
    localStorage.setItem('widgetTitles', JSON.stringify(titles));
  }, [titles]);
  useEffect(() => {
    localStorage.setItem('widgetFavs', JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem('widgetHidden', JSON.stringify(hidden));
  }, [hidden]);

  // Handlers
  const onLayoutChange = (newLayout) => setLayout(newLayout);
  const handleRename = (id, newTitle) => setTitles((t) => ({ ...t, [id]: newTitle }));
  const handleFav = (id) => setFavs((f) => ({ ...f, [id]: !f[id] }));
  const handleHide = (id) => setHidden((h) => Array.from(new Set([...h, id])));

  // Settings panel
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
    list.map(({ id, label, component: Component }) => {
      const cfg = layout.find((l) => l.i === id);
      if (!cfg) {
        console.warn('Missing layout for widget ' + id);
        return null;
      }
      if (typeof Component !== 'function') {
        console.warn('Component for widget ' + id + ' is invalid');
        return null;
      }
      return (
        <div key={id} data-grid={cfg}>
          <WidgetWrapper
            id={id}
            title={titles[id] || label}
            loading={false}
            favorite={!!favorites[id]}
            onRename={handleRename}
            onToggleFavorite={handleFav}
            onHide={handleHide}
            showSettings
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

      {/* Green "+" button at top-right */}
      <Link
        to="/widget-library"
        className="fixed top-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        <FaPlus size={24} />
      </Link>
    </div>
  );
}
