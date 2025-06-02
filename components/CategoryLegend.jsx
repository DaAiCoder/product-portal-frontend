// File: src/components/CategoryLegend.jsx

import React from 'react';

export default function CategoryLegend({
  categories,
  visibleCategories,
  onToggleCategory,
}) {
  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">Category Filters</h3>
      <ul>
        {categories.map((c) => (
          <li key={c.id} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={visibleCategories[c.name]}
              onChange={() => onToggleCategory(c.name)}
              className="mr-2"
            />
            <span className="flex items-center">
              <span
                className="w-3 h-3 inline-block mr-2"
                style={{ backgroundColor: c.color }}
              />
              {c.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
