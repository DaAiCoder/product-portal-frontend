// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarSections } from '../utils/sidebarLinks';
import { cn } from '../utils/cn';
import ThemeToggle from './ThemeToggle';
import { FaPlus } from 'react-icons/fa';

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full z-40 bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-72"
      )}
    >
      <div>
        <div className="flex justify-between items-center px-4 py-3 border-b border-blue-500">
          {!collapsed && <h2 className="text-lg font-semibold">Dashboard</h2>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:text-gray-200"
          >
            {collapsed ? '›' : '‹'}
          </button>
        </div>

        {!collapsed && (
          <div className="px-4 py-2 border-b border-blue-500">
            <ThemeToggle />
          </div>
        )}

        <div className="overflow-y-auto p-2">
          {sidebarSections.map((section) => {
            const isExpanded = expandedSections[section.id];
            return (
              <div key={section.id} className="mb-3">
                {section.items ? (
                  <>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={cn(
                        "flex items-center justify-between w-full px-2 py-2 text-sm font-semibold rounded hover:bg-blue-500 transition",
                        "text-white"
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        {section.icon && <span className="text-lg">{section.icon}</span>}
                        {!collapsed && <span>{section.label}</span>}
                      </div>
                      {!collapsed && section.items.length > 0 && (
                        <span className="text-xs">{isExpanded ? '−' : '+'}</span>
                      )}
                    </button>
                    {!collapsed && isExpanded && (
                      <div className="ml-6 mt-1 space-y-1">
                        {section.items.map((item) => (
                          <Link
                            key={item.id}
                            to={item.to}
                            className={cn(
                              "block px-2 py-1 text-sm rounded hover:bg-blue-500 transition",
                              location.pathname === item.to
                                ? "bg-blue-700 font-semibold"
                                : "text-white"
                            )}
                          >
                            {item.icon && <span className="mr-2">{item.icon}</span>}
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={section.to}
                    className={cn(
                      "block px-2 py-2 text-sm rounded hover:bg-blue-500 transition",
                      location.pathname === section.to
                        ? "bg-blue-700 font-semibold"
                        : "text-white"
                    )}
                  >
                    {section.icon && <span className="mr-2">{section.icon}</span>}
                    {section.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        <Link
          to="/widget-library"
          className="w-full flex items-center justify-center bg-green-400 hover:bg-green-500 text-white rounded-full shadow-lg py-3 transition"
          style={{ fontSize: '1.4rem' }}
        >
          <FaPlus className="mr-2" /> Add Widget
        </Link>
      </div>
    </aside>
  );
}
