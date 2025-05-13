import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FaBars,
  FaThLarge,
  FaEnvelope,
  FaCalendarAlt,
  FaStickyNote,
  FaFolderOpen,
  FaClock,
} from 'react-icons/fa';

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const tools = [
    { to: '/email',    icon: <FaEnvelope size={20} />,    label: 'Email' },
    { to: '/calendar', icon: <FaCalendarAlt size={20} />, label: 'Calendar' },
    { to: '/notes',    icon: <FaStickyNote size={20} />,  label: 'Notes' },
    { to: '/files',    icon: <FaFolderOpen size={20} />,  label: 'Files' },
    { to: '/clock',    icon: <FaClock size={20} />,       label: 'Clock' },
  ];

  // If any child route matches, mark parent active
  const parentActive = tools.some(t => location.pathname.startsWith(t.to));

  return (
    <nav
      className={`
        fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg 
        flex flex-col py-4 transition-all duration-300 z-30
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="p-2 mx-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <FaBars size={20} />
      </button>

      {/* Productivity parent */}
      <div className="mt-6 relative">
        <button
          onClick={() => setOpen(o => !o)}
          className={`
            w-full flex items-center px-4 py-2 rounded 
            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
            ${parentActive
              ? 'bg-blue-500 text-white dark:bg-blue-400'
              : 'text-gray-600 dark:text-gray-300'}
          `}
          aria-expanded={open}
          aria-controls="prod-menu"
        >
          <FaThLarge size={20} />
          {!collapsed && <span className="ml-3">Productivity</span>}
        </button>

        {/* Expanded submenu */}
        {open && !collapsed && (
          <div id="prod-menu" className="mt-1">
            {tools.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `
                  flex items-center px-8 py-2 rounded mb-1 
                  hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                  ${isActive
                    ? 'bg-blue-500 text-white dark:bg-blue-400'
                    : 'text-gray-600 dark:text-gray-300'}
                `}
              >
                {icon}
                <span className="ml-3">{label}</span>
              </NavLink>
            ))}
          </div>
        )}

        {/* Collapsed fly-out submenu */}
        {open && collapsed && (
          <div
            id="prod-menu"
            className="absolute left-full top-0 ml-2 bg-white dark:bg-gray-800 shadow-lg rounded w-48 z-40"
          >
            {tools.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `
                  flex items-center px-4 py-2 rounded 
                  hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                  ${isActive
                    ? 'bg-blue-500 text-white dark:bg-blue-400'
                    : 'text-gray-600 dark:text-gray-300'}
                `}
              >
                {icon}
                <span className="ml-2">{label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
