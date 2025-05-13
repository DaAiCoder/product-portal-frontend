// File: src/components/Sidebar.js
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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Define your initial tool lists once, outside the component
const INITIAL_PROD = [
  { id: 'email',      to: '/email',      icon: <FaEnvelope size={20} />,    label: 'Email' },
  { id: 'calendar',   to: '/calendar',   icon: <FaCalendarAlt size={20} />, label: 'Calendar' },
  { id: 'notes',      to: '/notes',      icon: <FaStickyNote size={20} />,  label: 'Notes' },
  { id: 'files',      to: '/files',      icon: <FaFolderOpen size={20} />,  label: 'Files' },
  { id: 'clock',      to: '/clock',      icon: <FaClock size={20} />,       label: 'Clock' },
];
const INITIAL_SOC = [
  { id: 'facebook',   to: '/social/facebook',  icon: <FaFacebook size={20} />,  label: 'Facebook' },
  { id: 'instagram',  to: '/social/instagram', icon: <FaInstagram size={20} />, label: 'Instagram' },
  { id: 'twitter',    to: '/social/twitter',   icon: <FaTwitter size={20} />,   label: 'Twitter (X)' },
  { id: 'rss',        to: '/social/rss',       icon: <FaRss size={20} />,       label: 'RSS Feeds' },
];

export default function Sidebar() {
  const location = useLocation();

  // Collapse state for sidebar
  const [collapsed, setCollapsed] = useState(false);
  // Submenu open/close
  const [openProd, setOpenProd]     = useState(false);
  const [openSocial, setOpenSocial] = useState(false);

  // Stateful tool lists, initialized from localStorage if present
  const [prodTools, setProdTools] = useState(() => {
    const saved = localStorage.getItem('sidebarProdOrder');
    if (saved) {
      const order = JSON.parse(saved);
      return order
        .map((id) => INITIAL_PROD.find((t) => t.id === id))
        .filter(Boolean);
    }
    return INITIAL_PROD;
  });
  const [socTools, setSocTools] = useState(() => {
    const saved = localStorage.getItem('sidebarSocialOrder');
    if (saved) {
      const order = JSON.parse(saved);
      return order
        .map((id) => INITIAL_SOC.find((t) => t.id === id))
        .filter(Boolean);
    }
    return INITIAL_SOC;
  });

  // Highlight active groups
  const prodActive   = prodTools.some((t) => location.pathname.startsWith(t.to));
  const socialActive = socTools.some((t) => location.pathname.startsWith(t.to));

  // Handle drag-and-drop between items within the same group
  const onDragEnd = ({ source, destination }) => {
    if (!destination || source.droppableId !== destination.droppableId) return;

    if (source.droppableId === 'prod') {
      const items = Array.from(prodTools);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setProdTools(items);
      localStorage.setItem(
        'sidebarProdOrder',
        JSON.stringify(items.map((t) => t.id))
      );
    } else if (source.droppableId === 'social') {
      const items = Array.from(socTools);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setSocTools(items);
      localStorage.setItem(
        'sidebarSocialOrder',
        JSON.stringify(items.map((t) => t.id))
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <nav
        className={`
          fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg 
          flex flex-col py-4 transition-all duration-300 z-30
          ${collapsed ? 'w-16' : 'w-64'}
        `}
      >
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="p-2 mx-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <FaBars size={20} />
        </button>

        {/* Productivity Group */}
        <div className="mt-6 relative">
          <button
            onClick={() => setOpenProd((o) => !o)}
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

          {/* Expanded & draggable submenu */}
          {!collapsed && openProd && (
            <Droppable droppableId="prod">
              {(provided) => (
                <div
                  id="prod-menu"
                  className="mt-1"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {prodTools.map((tool, idx) => (
                    <Draggable key={tool.id} draggableId={tool.id} index={idx}>
                      {(prov) => (
                        <NavLink
                          to={tool.to}
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          className={({ isActive }) => `
                            flex items-center px-8 py-2 rounded mb-1 
                            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                            ${isActive
                              ? 'bg-blue-500 text-white dark:bg-blue-400'
                              : 'text-gray-600 dark:text-gray-300'}
                          `}
                        >
                          {tool.icon}
                          <span className="ml-3">{tool.label}</span>
                        </NavLink>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}

          {/* Collapsed fly-out submenu (no drag here) */}
          {collapsed && openProd && (
            <div
              id="prod-menu"
              className="absolute left-full top-0 ml-2 bg-white dark:bg-gray-800 shadow-lg rounded w-48 z-40"
            >
              {prodTools.map((tool) => (
                <NavLink
                  key={tool.id}
                  to={tool.to}
                  className={({ isActive }) => `
                    flex items-center px-4 py-2 rounded 
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                    ${isActive
                      ? 'bg-blue-500 text-white dark:bg-blue-400'
                      : 'text-gray-600 dark:text-gray-300'}
                  `}
                >
                  {tool.icon}
                  <span className="ml-2">{tool.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Social Feeds Group */}
        <div className="mt-4 relative">
          <button
            onClick={() => setOpenSocial((o) => !o)}
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

          {/* Expanded & draggable submenu */}
          {!collapsed && openSocial && (
            <Droppable droppableId="social">
              {(provided) => (
                <div
                  id="social-menu"
                  className="mt-1"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {socTools.map((tool, idx) => (
                    <Draggable key={tool.id} draggableId={tool.id} index={idx}>
                      {(prov) => (
                        <NavLink
                          to={tool.to}
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          className={({ isActive }) => `
                            flex items-center px-8 py-2 rounded mb-1 
                            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                            ${isActive
                              ? 'bg-green-500 text-white dark:bg-green-400'
                              : 'text-gray-600 dark:text-gray-300'}
                          `}
                        >
                          {tool.icon}
                          <span className="ml-3">{tool.label}</span>
                        </NavLink>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}

          {/* Collapsed fly-out submenu */}
          {collapsed && openSocial && (
            <div
              id="social-menu"
              className="absolute left-full top-0 ml-2 bg-white dark:bg-gray-800 shadow-lg rounded w-48 z-40"
            >
              {socTools.map((tool) => (
                <NavLink
                  key={tool.id}
                  to={tool.to}
                  className={({ isActive }) => `
                    flex items-center px-4 py-2 rounded 
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                    ${isActive
                      ? 'bg-green-500 text-white dark:bg-green-400'
                      : 'text-gray-600 dark:text-gray-300'}
                  `}
                >
                  {tool.icon}
                  <span className="ml-2">{tool.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>
    </DragDropContext>
);
}
