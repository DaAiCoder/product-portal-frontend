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
  FaShareAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaRss,
} from 'react-icons/fa';

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openProd, setOpenProd] = useState(false);
  const [openSocial, setOpenSocial] = useState(false);

  const prodTools = [
    { to: '/email',    icon: <FaEnvelope size={20} />,    label: 'Email' },
    { to: '/calendar', icon: <FaCalendarAlt size={20} />, label: 'Calendar' },
    { to: '/notes',    icon: <FaStickyNote size={20} />,  label: 'Notes' },
    { to: '/files',    icon: <FaFolderOpen size={20} />,  label: 'Files' },
    { to: '/clock',    icon: <FaClock size={20} />,       label: 'Clock' },
  ];
  const socTools = [
    { to: '/social/facebook',   icon: <FaFacebook size={20} />,  label: 'Facebook' },
    { to: '/social/instagram',  icon: <FaInstagram size={20} />, label: 'Instagram' },
    { to: '/social/twitter',    icon: <FaTwitter size={20} />,   label: 'Twitter (X)' },
    { to: '/social/rss',        icon: <FaRss size={20} />,       label: 'RSS Feeds' },
  ];

  const prodActive   = prodTools.some(t => location.pathname.startsWith(t.to));
  const socialActive = socTools.some(t => location.pathname.startsWith(t.to));

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

      {/* Productivity group */}
      <div className="mt-6 relative">
        <button
          onClick={() => setOpenProd(o => !o)}
          className={`
            w-full flex items-center px-4 py-2 rounded 
            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
            ${prodActive
              ? 'bg-blue-500 text-white dark:bg-blue-400'
              : 'text-gray-600 dark:text-gray-300'}
          `}
          aria-expanded={openProd}
          aria-controls="prod-menu"
        >
          <FaThLarge size={20} />
          {!collapsed && <span className="ml-3">Productivity</span>}
        </button>

        {/* Expanded submenu */}
        {openProd && !collapsed && (
          <div id="prod-menu" className="mt-1">
            {prodTools.map(({ to, icon, label }) => (
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
        {openProd && collapsed && (
          <div
            id="prod-menu"
            className="absolute left-full top-0 ml-2 bg-white dark:bg-gray-800 shadow-lg rounded w-48 z-40"
          >
            {prodTools.map(({ to, icon, label }) => (
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

      {/* Social Feeds group */}
      <div className="mt-4 relative">
        <button
          onClick={() => setOpenSocial(o => !o)}
          className={`
            w-full flex items-center px-4 py-2 rounded 
            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
            ${socialActive
              ? 'bg-green-500 text-white dark:bg-green-400'
              : 'text-gray-600 dark:text-gray-300'}
          `}
          aria-expanded={openSocial}
          aria-controls="social-menu"
        >
          <FaShareAlt size={20} />
          {!collapsed && <span className="ml-3">Social Feeds</span>}
        </button>

        {/* Expanded submenu */}
        {openSocial && !collapsed && (
          <div id="social-menu" className="mt-1">
            {socTools.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `
                  flex items-center px-8 py-2 rounded mb-1 
                  hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                  ${isActive
                    ? 'bg-green-500 text-white dark:bg-green-400'
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
        {openSocial && collapsed && (
          <div
            id="social-menu"
            className="absolute left-full top-0 ml-2 bg-white dark:bg-gray-800 shadow-lg rounded w-48 z-40"
          >
            {socTools.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `
                  flex items-center px-4 py-2 rounded 
                  hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                  ${isActive
                    ? 'bg-green-500 text-white dark:bg-green-400'
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
