// File: src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
  FaComments,
} from 'react-icons/fa';

const INITIAL_PROD = [
  { id: 'email', to: '/email', icon: <FaEnvelope />, label: 'Email' },
  { id: 'calendar', to: '/calendar', icon: <FaCalendarAlt />, label: 'Calendar' },
  { id: 'notes', to: '/notes', icon: <FaStickyNote />, label: 'Notes' },
  { id: 'files', to: '/files', icon: <FaFolderOpen />, label: 'Files' },
  { id: 'clock', to: '/clock', icon: <FaClock />, label: 'Clock' },
  { id: 'chat', to: '/chat', icon: <FaComments />, label: 'Chat' },
];

const INITIAL_SOC = [
  { id: 'facebook', to: '/social/facebook', icon: <FaFacebook />, label: 'Facebook' },
  { id: 'instagram', to: '/social/instagram', icon: <FaInstagram />, label: 'Instagram' },
  { id: 'twitter', to: '/social/twitter', icon: <FaTwitter />, label: 'Twitter (X)' },
  { id: 'rss', to: '/social/rss', icon: <FaRss />, label: 'RSS Feeds' },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(
    () => JSON.parse(localStorage.getItem('sidebarCollapsed')) || false
  );
  const [openProd, setOpenProd] = useState(false);
  const [openSocial, setOpenSocial] = useState(false);
  const [prodTools, setProdTools] = useState(INITIAL_PROD);
  const [socTools, setSocTools] = useState(INITIAL_SOC);

  useEffect(() => {
    const savedProd = JSON.parse(localStorage.getItem('sidebarProdOrder'));
    const savedSoc = JSON.parse(localStorage.getItem('sidebarSocialOrder'));
    if (savedProd) {
      const ordered = savedProd.map((id) => INITIAL_PROD.find((t) => t.id === id)).filter(Boolean);
      setProdTools(ordered);
    }
    if (savedSoc) {
      const ordered = savedSoc.map((id) => INITIAL_SOC.find((t) => t.id === id)).filter(Boolean);
      setSocTools(ordered);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  const prodActive = prodTools.some((t) => location.pathname.startsWith(t.to));
  const socialActive = socTools.some((t) => location.pathname.startsWith(t.to));

  const onDragEnd = ({ source, destination }) => {
    if (!destination || source.droppableId !== destination.droppableId) return;
    const list = source.droppableId === 'prod' ? prodTools : socTools;
    const setter = source.droppableId === 'prod' ? setProdTools : setSocTools;
    const copy = Array.from(list);
    const [moved] = copy.splice(source.index, 1);
    copy.splice(destination.index, 0, moved);
    setter(copy);
    localStorage.setItem(
      source.droppableId === 'prod' ? 'sidebarProdOrder' : 'sidebarSocialOrder',
      JSON.stringify(copy.map((t) => t.id))
    );
  };

  const toggleProd = () => {
    setOpenProd((p) => !p);
    if (!openProd) setOpenSocial(false);
  };

  const toggleSocial = () => {
    setOpenSocial((s) => !s);
    if (!openSocial) setOpenProd(false);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <nav
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col py-4 transition-all duration-300 z-30 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="p-2 mx-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FaBars size={20} />
        </button>

        {/* Productivity Section */}
        <div className="mt-6 relative">
          <button
            onClick={toggleProd}
            className={`w-full flex items-center px-4 py-2 rounded ${
              prodActive
                ? 'bg-blue-500 text-white dark:bg-blue-400'
                : 'text-gray-600 dark:text-gray-300'
            } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
          >
            <FaThLarge size={20} />
            {!collapsed && <span className="ml-3">Productivity</span>}
          </button>

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
                          className={({ isActive }) =>
                            `flex items-center px-8 py-2 rounded mb-1 ${
                              isActive
                                ? 'bg-blue-500 text-white dark:bg-blue-400'
                                : 'text-gray-600 dark:text-gray-300'
                            } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`
                          }
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
        </div>

        {/* Social Section */}
        <div className="mt-4 relative">
          <button
            onClick={toggleSocial}
            className={`w-full flex items-center px-4 py-2 rounded ${
              socialActive
                ? 'bg-green-500 text-white dark:bg-green-400'
                : 'text-gray-600 dark:text-gray-300'
            } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
          >
            <FaShareAlt size={20} />
            {!collapsed && <span className="ml-3">Social Feeds</span>}
          </button>

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
                          className={({ isActive }) =>
                            `flex items-center px-8 py-2 rounded mb-1 ${
                              isActive
                                ? 'bg-green-500 text-white dark:bg-green-400'
                                : 'text-gray-600 dark:text-gray-300'
                            } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`
                          }
                        >
                          {tool.icon}
                          <span className="ml-3">{tool.label}</span>
                        </NavLink>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>

{/* Chat Section (Standalone) */}
<div className="mt-4">
  <NavLink
    to="/chat"
    className={({ isActive }) =>
      `w-full flex items-center px-4 py-2 rounded ${
        isActive
          ? 'bg-purple-500 text-white dark:bg-purple-400'
          : 'text-gray-600 dark:text-gray-300'
      } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`
    }
  >
    <FaComments size={20} />
    {!collapsed && <span className="ml-3">Chat</span>}
  </NavLink>
</div>

              )}
            </Droppable>
          )}
        </div>
      </nav>
    </DragDropContext>
  );
}

