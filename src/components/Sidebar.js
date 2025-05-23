// src/components/Sidebar.js
import React, { useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { sidebarSections } from '../utils/sidebarLinks';
import ThemeToggle from './ThemeToggle';
import { FaPlus } from 'react-icons/fa';

export default function Sidebar() {
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    // scroll active link into view
    const active = menuRef.current?.querySelector('.active');
    if (active) active.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [location.pathname]);

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-blue-100 text-gray-800 shadow-lg flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <ThemeToggle />
      </div>

      {/* nav */}
      <nav ref={menuRef} className="flex-1 overflow-y-auto px-2 py-4">
        {sidebarSections.map((section) => (
          <div key={section.id} className="mb-6">
            <div className="px-2 text-xs font-semibold uppercase text-gray-600 mb-2">
              {section.label}
            </div>
            <div className="space-y-1">
              {(section.items || [section]).map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-200 ${
                      isActive ? 'bg-blue-200 active' : ''
                    }`
                  }
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* footer */}
      <div className="px-4 py-4 border-t border-gray-200">
        <NavLink
          to="/widget-library"
          className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full py-2"
        >
          <FaPlus className="mr-2" /> Add Widget
        </NavLink>
      </div>
    </aside>
  );
}
