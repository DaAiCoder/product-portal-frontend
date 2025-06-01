// File: src/pages/Dashboard.js

import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import WidgetWrapper from '../components/WidgetWrapper';
import WidgetSettingsPanel from '../components/WidgetSettingsPanel';
import { widgetLibrary } from '../utils/widgetLibrary';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default function Dashboard() {
  // Default layout
  const defaultLayout = widgetLibrary.map((w, i) => ({
    i: w.id,
    x: (i * w.w) % 12,
    y: Math.floor((i * w.w) / 12) * w.h,
    w: w.w,
    h: w.h,
  }));

  // Safe initial values
  const [layout, setLayout] = useState(defaultLayout);
  const [titles, setTitles] = useState({});
  const [favorites, setFavs] = useState({});
  const [hidden, setHidden] = useState([]);

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Layout
      let savedLayout = [];
      try {
        const savedRaw = localStorage.getItem('dashboardLayout');
        savedLayout = savedRaw ? JSON.parse(savedRaw) : [];
      } catch {}
      const mergedLayout = defaultLayout.map((def) => {
        const match = savedLayout.find((s) => s.i === def.i);
        return match || def;
      });
      setLayout(mergedLayout);

      // Titles
      try {
        setTitles(JSON.parse(localStorage.getItem('widgetTitles') || '{}'));
      } catch {}
      // Favorites
      try {
        setFavs(JSON.parse(localStorage.getItem('widgetFavs') || '{}'));
      } catch {}
      // Hidden
      try {
        setHidden(JSON.parse(localStorage.getItem('widgetHidden') || '[]'));
      } catch {}
    }
    // eslint-disable-next-line
  }, []);

  // Persist state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboardLayout', JSON.stringify(layout));
    }
  }, [layout]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('widgetTitles', JSON.stringify(titles));
    }
  }, [titles]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('widgetFavs', JSON.stringify(favorites));
    }
  }, [favorites]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('widgetHidden', JSON.stringify(hidden));
    }
  }, [hidden]);

  // Handlers and render logic unchanged...

  const onLayoutChange = (newLayout) => setLayout(newLayout);
  const handleRename = (id, newTitle) =>
    setTitles((t) => ({ ...t, [id]: newTitle }));
  const handleFav = (id) => setFavs((f) => ({ ...f, [id]: !f[id] }));
  const handleHide = (id) => setHidden((h) => Array.from(new Set([...h, id])));

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsWidgetId, setSettingsWidgetId] = useState(null);
  const handleOpenSettings = (id) => {
    setSettingsWidgetId(id);
    setSettingsOpen(true);
  };

  const visibleWidgets = widgetLibrary.filter((w) => !hidden.includes(w.id));
  const pinnedWidgets = visibleWidgets.filter((w) => favorites[w.id]);
  const otherWidgets = visibleWidgets.filter((w) => !favorites[w.id]);

  const renderWidgets = (list) =>
    list.map(({ id, label, component: Component, defaultSettings = {} }) => {
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
            <Component config={defaultSettings} />
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
      <Link href="/widget-library" className="fixed top-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50">
        <FaPlus size={24} />
      </Link>
    </div>
  );
}
