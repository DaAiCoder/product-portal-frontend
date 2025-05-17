// File: src/components/Sidebar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarSections } from '../utils/sidebarLinks';
import { cn } from '../utils/cn';

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "h-full bg-white dark:bg-gray-950 border-r dark:border-gray-800 transition-all duration-200 ease-in-out",
      collapsed ? "w-16" : "w-60"
    )}>
      <div className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-800">
        {!collapsed && <h2 className="text-lg font-semibold">My Dashboard</h2>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      <div className="overflow-y-auto p-2">
        {sidebarSections.map((section) => (
          <div key={section.id} className="mb-4">
            <div className={cn(
              "text-xs font-bold uppercase tracking-wide px-2 py-1 mb-1",
              collapsed ? "text-center text-gray-400" : "text-gray-500"
            )}>
              {collapsed ? (
                <div title={section.label}>•</div>
              ) : (
                section.label
              )}
            </div>

            {section.items && section.items.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className={cn(
                  "flex items-center px-2 py-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition",
                  location.pathname === item.to
                    ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            ))}

            {section.to && (
              <Link
                to={section.to}
                className={cn(
                  "flex items-center px-2 py-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition",
                  location.pathname === section.to
                    ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                <span className="text-lg">{section.icon}</span>
                {!collapsed && <span className="ml-3">{section.label}</span>}
              </Link>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
