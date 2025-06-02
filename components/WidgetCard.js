import React from 'react';

export default function WidgetCard({ title, children, className = '' }) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800
        rounded-lg shadow
        p-4
        flex flex-col
        ${className}
      `}
    >
      {title && (
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          {title}
        </h2>
      )}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
