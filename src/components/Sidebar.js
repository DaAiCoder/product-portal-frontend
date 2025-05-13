import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaEnvelope,
  FaCalendarAlt,
  FaStickyNote,
  FaFolderOpen,
  FaClock,
} from 'react-icons/fa';

export default function Sidebar() {
  const items = [
    { to: '/email',    icon: <FaEnvelope size={20} />,    label: 'Email' },
    { to: '/calendar', icon: <FaCalendarAlt size={20} />, label: 'Calendar' },
    { to: '/notes',    icon: <FaStickyNote size={20} />,  label: 'Notes' },
    { to: '/files',    icon: <FaFolderOpen size={20} />,  label: 'Files' },
    { to: '/clock',    icon: <FaClock size={20} />,       label: 'Clock' },
  ];

  return (
    <nav className="fixed top-0 left-0 h-full w-16 bg-white dark:bg-gray-800 shadow-lg flex flex-col items-center py-6 space-y-6 z-30">
      {items.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              isActive
                ? 'bg-blue-500 text-white dark:bg-blue-400'
                : 'text-gray-600 dark:text-gray-300'
            }`
          }
          title={label}
        >
          {icon}
        </NavLink>
      ))}
    </nav>
  );
}
