// File: src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  DragDropContext, 
  Droppable, 
  Draggable 
} from 'react-beautiful-dnd';
import {
  FaBars, FaThLarge, FaEnvelope, FaCalendarAlt, FaStickyNote,
  FaFolderOpen, FaClock, FaShareAlt, FaFacebook, FaInstagram,
  FaTwitter, FaRss,
} from 'react-icons/fa';

const PROD_KEY = 'sidebarProdOrder';
const SOC_KEY  = 'sidebarSocialOrder';

const DEFAULT_PROD = [
  { id: 'email',    to: '/email',    icon: <FaEnvelope/>,    label: 'Email' },
  { id: 'calendar', to: '/calendar', icon: <FaCalendarAlt/>, label: 'Calendar' },
  { id: 'notes',    to: '/notes',    icon: <FaStickyNote/>,  label: 'Notes' },
  { id: 'files',    to: '/files',    icon: <FaFolderOpen/>,  label: 'Files' },
  { id: 'clock',    to: '/clock',    icon: <FaClock/>,       label: 'Clock' },
];
const DEFAULT_SOC = [
  { id: 'facebook',  to: '/social/facebook',  icon: <FaFacebook/>, label: 'Facebook' },
  { id: 'instagram', to: '/social/instagram', icon: <FaInstagram/>,label: 'Instagram' },
  { id: 'twitter',   to: '/social/twitter',   icon: <FaTwitter/>,  label: 'Twitter' },
  { id: 'rss',       to: '/social/rss',       icon: <FaRss/>,      label: 'RSS Feeds' },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed]   = useState(false);
  const [openProd, setOpenProd]     = useState(false);
  const [openSocial, setOpenSocial] = useState(false);

  // Load persisted order or fall back to defaults
  const [prodTools, setProdTools] = useState(() => {
    const saved = localStorage.getItem(PROD_KEY);
    if (saved) {
      const order = JSON.parse(saved);
      return order
        .map(id => DEFAULT_PROD.find(t => t.id === id))
        .filter(Boolean);
    }
    return DEFAULT_PROD;
  });
  const [socTools, setSocTools] = useState(() => {
    const saved = localStorage.getItem(SOC_KEY);
    if (saved) {
      const order = JSON.parse(saved);
      return order
        .map(id => DEFAULT_SOC.find(t => t.id === id))
        .filter(Boolean);
    }
    return DEFAULT_SOC;
  });

  const prodActive   = prodTools.some(t => location.pathname.startsWith(t.to));
  const socialActive = socTools.some(t => location.pathname.startsWith(t.to));

  // When dragging ends, reorder and persist
  const onDragEnd = ({ source, destination }) => {
    if (!destination || source.droppableId !== destination.droppableId) return;

    if (source.droppableId === 'prod') {
      const items = Array.from(prodTools);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setProdTools(items);
      localStorage.setItem(PROD_KEY, JSON.stringify(items.map(t => t.id)));
    } else {
      const items = Array.from(socTools);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setSocTools(items);
      localStorage.setItem(SOC_KEY, JSON.stringify(items.map(t => t.id)));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <nav className={`
        fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg 
        flex flex-col py-4 transition-all duration-300 z-30
        ${collapsed ? 'w-16' : 'w-64'}
      `}>
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="p-2 mx-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FaBars size={20} />
        </button>

        {/* Productivity Group */}
        <div className="mt-6 relative">
          <button
            onClick={() => setOpenProd(o => !o)}
            className={`
              w-full flex items-center px-4 py-2 rounded 
              ${prodActive ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300'}
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
            `}
            aria-expanded={openProd}
          >
            <FaThLarge size={20} />
            {!collapsed && <span className="ml-3">Productivity</span>}
          </button>

          {/* Expanded & Draggable List */}
          {!collapsed && openProd && (
            <Droppable droppableId="prod">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="mt-1"
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
                            ${isActive ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300'}
                            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
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

          {/* Collapsed Fly-Out */}
          {collapsed && openProd && (
            <div className="absolute left-full top-0 ml-2 bg-white dark:bg-gray-800 shadow-lg rounded w-48 z-40">
              {prodTools.map(tool => (
                <NavLink
                  key={tool.id}
                  to={tool.to}
                  className={({ isActive }) => `
                    flex items-center px-4 py-2 rounded
                    ${isActive ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300'}
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                  `}
                >
                  {tool.icon}
                  <span className="ml-2">{tool.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Social Feeds Group (same pattern) */}
        <div className="mt-4 relative">
          <button
            onClick={() => setOpenSocial(o => !o)}
            className={`
              w-full flex items-center px-4 py-2 rounded 
              ${socialActive ? 'bg-green-500 text-white' : 'text-gray-600 dark:text-gray-300'}
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
            `}
            aria-expanded={openSocial}
          >
            <FaShareAlt size={20} />
            {!collapsed && <span className="ml-3">Social Feeds</span>}
          </button>

          {!collapsed && openSocial && (
            <Droppable droppableId="social">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="mt-1"
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
                            ${isActive ? 'bg-green-500 text-white' : 'text-gray-600 dark:text-gray-300'}
                            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
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

          {collapsed && openSocial && (
            <div className="absolute left-full top-0 ml-2 bg-white dark:bg-gray-800 shadow-lg rounded w-48 z-40">
              {socTools.map(tool => (
                <NavLink
                  key={tool.id}
                  to={tool.to}
                  className={({ isActive }) => `
                    flex items-center px-4 py-2 rounded
                    ${isActive ? 'bg-green-500 text-white' : 'text-gray-600 dark:text-gray-300'}
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
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

