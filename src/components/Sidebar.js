// File: src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
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
} from 'react-icons/fa';

const INITIAL_PROD = [
  { id: 'email', to: '/email', icon: <FaEnvelope />, label: 'Email' },
  { id: 'calendar', to: '/calendar', icon: <FaCalendarAlt />, label: 'Calendar' },
  { id: 'notes', to: '/notes', icon: <FaStickyNote />, label: 'Notes' },
  { id: 'files', to: '/files', icon: <FaFolderOpen />, label: 'Files' },
  { id: 'clock', to: '/clock', icon: <FaClock />, label: 'Clock' },
];

const INITIAL_SOC = [
  { id: 'facebook', to: '/social/facebook', icon: <FaFacebook />, label: 'Facebook' },
  { id: 'instagram', to: '/social/instagram', icon: <FaInstagram />, label: 'Instagram' },
  { id: 'twitter', to: '/social/twitter', icon: <FaTwitter />, label: 'Twitter (X)' },
  { id: 'rss', to: '/social/rss', icon: <FaRss />, label: 'RSS Feeds' },
];

const DEFAULT_SECTIONS = [
  { id: 'prod', label: 'Productivity' },
  { id: 'social', label: 'Social Feeds' },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState({ prod: false, social: false });
  const [prodTools, setProdTools] = useState(INITIAL_PROD);
  const [socTools, setSocTools] = useState(INITIAL_SOC);
  const [sections, setSections] = useState(DEFAULT_SECTIONS);

  const isActive = (tools) => tools.some((t) => location.pathname.startsWith(t.to));

  useEffect(() => {
    const savedProd = JSON.parse(localStorage.getItem('sidebarProdOrder'));
    const savedSoc = JSON.parse(localStorage.getItem('sidebarSocialOrder'));
    const savedMain = JSON.parse(localStorage.getItem('sidebarMainOrder'));
    const savedCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';

    if (savedProd) setProdTools(savedProd.map((id) => INITIAL_PROD.find((t) => t.id === id)).filter(Boolean));
    if (savedSoc) setSocTools(savedSoc.map((id) => INITIAL_SOC.find((t) => t.id === id)).filter(Boolean));
    if (savedMain) setSections(savedMain);
    setCollapsed(savedCollapsed);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', collapsed);
  }, [collapsed]);

  const onDragEnd = ({ source, destination, type }) => {
    if (!destination) return;
    if (type === 'section') {
      const copy = Array.from(sections);
      const [moved] = copy.splice(source.index, 1);
      copy.splice(destination.index, 0, moved);
      setSections(copy);
      localStorage.setItem('sidebarMainOrder', JSON.stringify(copy));
    } else {
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
    }
  };

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ prod: false, social: false, [id]: !prev[id] }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <nav className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col py-4 transition-all duration-300 z-30 ${collapsed ? 'w-16' : 'w-64'}`}>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="p-2 mx-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle Sidebar"
        >
          <FaBars size={20} />
        </button>

        <Droppable droppableId="main" type="section">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="mt-4">
              {sections.map((section, index) => (
                <Draggable draggableId={section.id} index={index} key={section.id}>
                  {(prov) => (
                    <div ref={prov.innerRef} {...prov.draggableProps}>
                      <button
                        onClick={() => toggleSection(section.id)}
                        {...prov.dragHandleProps}
                        className={`w-full flex items-center px-4 py-2 rounded ${
                          isActive(section.id === 'prod' ? prodTools : socTools)
                            ? section.id === 'prod'
                              ? 'bg-blue-500 text-white dark:bg-blue-400'
                              : 'bg-green-500 text-white dark:bg-green-400'
                            : 'text-gray-600 dark:text-gray-300'
                        } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                      >
                        {section.id === 'prod' ? <FaThLarge size={20} /> : <FaShareAlt size={20} />}
                        {!collapsed && <span className="ml-3">{section.label}</span>}
                      </button>

                      {!collapsed && openSections[section.id] && (
                        <Droppable droppableId={section.id} type="tool">
                          {(inner) => (
                            <div ref={inner.innerRef} {...inner.droppableProps} className="mt-1">
                              {(section.id === 'prod' ? prodTools : socTools).map((tool, idx) => (
                                <Draggable draggableId={tool.id} index={idx} key={tool.id}>
                                  {(toolProv) => (
                                    <NavLink
                                      to={tool.to}
                                      ref={toolProv.innerRef}
                                      {...toolProv.draggableProps}
                                      {...toolProv.dragHandleProps}
                                      className={({ isActive }) => `
                                        flex items-center px-8 py-2 rounded mb-1
                                        ${isActive
                                          ? section.id === 'prod'
                                            ? 'bg-blue-500 text-white dark:bg-blue-400'
                                            : 'bg-green-500 text-white dark:bg-green-400'
                                          : 'text-gray-600 dark:text-gray-300'}
                                        hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`
                                      }
                                    >
                                      {tool.icon}
                                      <span className="ml-3">{tool.label}</span>
                                    </NavLink>
                                  )}
                                </Draggable>
                              ))}
                              {inner.placeholder}
                            </div>
                          )}
                        </Droppable>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </nav>
    </DragDropContext>
  );
}


