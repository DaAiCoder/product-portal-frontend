// File: src/pages/dashboard.js
import React from 'react';
import { widgetLibrary } from '../utils/widgetLibrary';
import WidgetWrapper from '../components/WidgetWrapper';

export default function Dashboard() {
  console.log("Loaded widgetLibrary:", widgetLibrary);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Widget Render Test</h1>

      {widgetLibrary.map(({ id, defaultTitle, Component }, i) => (
        <div key={id} className="border p-4 rounded shadow bg-white dark:bg-gray-800">
          <WidgetWrapper
            id={id}
            title={defaultTitle}
            loading={false}
            favorite={false}
            onRename={() => {}}
            onToggleFavorite={() => {}}
            onHide={() => {}}
            showSettings={false}
          >
            <Component />
          </WidgetWrapper>
        </div>
      ))}
    </div>
  );
}
