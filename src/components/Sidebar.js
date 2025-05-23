// File: src/components/Sidebar.js

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import {
  FaBars,
  FaThLarge,
  FaEnvelope,
  FaCalendarAlt,
  FaStickyNote,
  FaBell,
  FaFolderOpen,
  FaClock,
  FaShareAlt,
  FaComments,
  FaRss,
  FaFire,
  FaYoutube,
  FaMusic,
  FaPodcast,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaRedditAlien,
} from 'react-icons/fa';

// Keys for persistence
const SECTION_KEY = 'sidebarSectionOrder';
const PROD_KEY    = 'sidebarProdOrder';
const SOC_KEY     = 'sidebarSocialOrder';

// All section definitions (Widget Library entry removed)
const ALL_SECTIONS = {
  productivity: {
    id: 'productivity',
    label: 'Productivity',
    icon: <FaThLarge />,
    subKey: PROD_KEY,
    defaultItems: [
      { id: 'email',     to: '/email',     icon: <FaEnvelope />,    label: 'Email' },
      { id: 'calendar',  to: '/calendar',  icon: <FaCalendarAlt />, label: 'Calendar' },
      { id: 'notes',     to: '/notes',     icon: <FaStickyNote />,  label: 'Notes' },
      { id: 'reminders', to: '/reminders', icon: <FaBell />,         label: 'Reminders' },
      { id: 'files',     to: '/files',     icon: <FaFolderOpen />,  label: 'Files' },
      { id: 'clock',     to: '/clock',     icon: <FaClock />,        label: 'Clock' },
    ],
  },
  social: {
    id: 'social',
    label: 'Social Feeds',
    icon: <FaShareAlt />,
    subKey: SOC_KEY,
    defaultItems: [
      { id: 'unified',   to: '/unified',   icon: <FaThLarge />,     label: 'Unified Feed' },
      { id: 'instagram', to: '/instagram', icon: <FaInstagram />,   label: 'Instagram' },
      { id: 'twitter',   to: '/twitter',   icon: <FaTwitter />,     label: 'Twitter/X' },
      { id: 'facebook',  to: '/facebook',  icon: <FaFacebook />,    label: 'Facebook' },
      { id: 'reddit',    to: '/reddit',    icon: <FaRedditAlien />, label: 'Reddit' },
    ],
  },
  chat: {
    id: 'chat',
    label: 'Chat',
    icon: <FaComments />,
    to: '/chat',
  },
  news: {
    id: 'news',
    label: 'News',
    icon: <FaRss />,
    defaultItems: [
      { id: 'feeds',    to: '/feeds',    icon: <FaRss />,  label: 'RSS Subscriptions' },
      { id: 'trending', to: '/trending', icon: <FaFire />, label: 'Trending Topics' },
    ],
  },
  media: {
    id: 'media',
    label: 'Video & Media',
    icon: <FaYoutube />,
    defaultItems: [
      { id: 'youtube',  to: '/youtube',  icon: <FaYoutube />, label: 'YouTube Feeds' },
      { id: 'music',    to: '/music',    icon: <FaMusic />,   label: 'Music Discovery' },
      { id: 'podcasts', to: '/podcasts', icon: <FaPodcast />, label: 'Podcasts' },
    ],
  },
};

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [sectionOrder, setSectionOrder] = useState(() => {
    const saved = localStorage.getItem(SECTION_KEY);
    return saved ? JSON.parse(saved) : Object.keys(ALL_SECTIONS);
  });
  const [prodItems, setProdItems] = useState(() => {
    const saved = localStorage.getItem(PROD_KEY);
    return saved
      ? JSON.parse(saved)
          .map((id) => ALL_SECTIONS.productivity.defaultItems.find((i) => i.id === id))
          .filter(Boolean)
      : ALL_SECTIONS.productivity.defaultItems;
  });
  const [socItems, setSocItems] = useState(() => {
    const saved = localStorage.getItem(SOC_KEY);
    return saved
      ? JSON.parse(saved)
          .map((id) => ALL_SECTIONS.social.defaultItems.find((i) => i.id === id))
          .filter(Boolean)
      : ALL_SECTIONS.social.defaultItems;
  });

  const isSectionActive = (sec) => {
    if (sec.subKey === PROD_KEY) return prodItems.some((i) => location.pathname.startsWith(i.to));
    if (sec.subKey === SOC_KEY)  return socItems.some((i) => location.pathname.startsWith(i.to));
    if (sec.defaultItems)        return sec.defaultItems.some((i) => location.pathname.startsWith(i.to));
    if (sec.to)                  return location.pathname === sec.to;
    return false;
  };

  const onDragEnd = ({ source, destination, draggableId, type }) => {
    if (!destination) return;
    if (type === 'SECTION') {
      const items = Array.from(sectionOrder);
      items.splice(source.index, 1);
      items.splice(destination.index, 0, draggableId);
      setSectionOrder(items);
      localStorage.setItem(SECTION_KEY, JSON.stringify(items));
      return;
    }
    if (source.droppableId === PROD_KEY && destination.droppableId === PROD_KEY) {
      const items = Array.from(prodItems);
      const [m] = items.splice(source.index, 1);
      items.splice(destination.index, 0, m);
      setProdItems(items);
      localStorage.setItem(PROD_KEY, JSON.stringify(items.map((i) => i.id)));
    }
    if (source.droppableId === SOC_KEY && destination.droppableId === SOC_KEY) {
      const items = Array.from(socItems);
      const [m] = items.splice(source.index, 1);
      items.splice(destination.index, 0, m);
      setSocItems(items);
      localStorage.setItem(SOC_KEY, JSON.stringify(items.map((i) => i.id)));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <nav
        className={`fixed top-0 left-0 h-full bg-white shadow-lg flex flex-col py-4 transition-all duration-300 z-30 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="p-2 mx-2 rounded hover:bg-gray-100 transition-colors"
        >
          <FaBars size={20} />
        </button>

        {/* Sections */}
        <Droppable droppableId="sections" type="SECTION">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="flex-1 overflow-y-auto">
              {sectionOrder.map((secId, idx) => {
                const sec = ALL_SECTIONS[secId];
                const active = isSectionActive(sec);
                const isOpen = openSections[secId];

                return (
                  <Draggable key={sec.id} draggableId={sec.id} index={idx}>
                    {(dragProv) => (
                      <div ref={dragProv.innerRef} {...dragProv.draggableProps} className="mb-4">
                        {/* Section Header */}
                        <button
                          onClick={() =>
                            setOpenSections((os) => ({ ...os, [secId]: !os[secId] }))
                          }
                          className={`flex items-center w-full px-4 py-2 rounded ${
                            active ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
                          } hover:bg-gray-100 transition-colors`}
                          {...dragProv.dragHandleProps}
                        >
                          {sec.icon}
                          {!collapsed && <span className="ml-3">{sec.label}</span>}
                          {!collapsed && sec.defaultItems && (
                            <span className="ml-auto">{isOpen ? '-' : '+'}</span>
                          )}
                        </button>

                        {/* Submenu */}
                        {!collapsed && sec.defaultItems && isOpen && (
                          <Droppable droppableId={sec.subKey} type="ITEM">
                            {(subProv) => (
                              <div ref={subProv.innerRef} {...subProv.droppableProps} className="ml-8">
                                {(sec.defaultItems === ALL_SECTIONS.productivity.defaultItems
                                  ? prodItems
                                  : sec.defaultItems === ALL_SECTIONS.social.defaultItems
                                  ? socItems
                                  : sec.defaultItems
                                ).map((item, i) => (
                                  <Draggable key={item.id} draggableId={item.id} index={i}>
                                    {(itemProv) => (
                                      <div
                                        ref={itemProv.innerRef}
                                        {...itemProv.draggableProps}
                                        {...itemProv.dragHandleProps}
                                        className="my-1"
                                      >
                                        <NavLink
                                          to={item.to}
                                          className={({ isActive }) =>
                                            `flex items-center px-4 py-2 rounded transition-colors ${
                                              isActive
                                                ? 'bg-gray-300 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`
                                          }
                                        >
                                          {item.icon}
                                          <span className="ml-3">{item.label}</span>
                                        </NavLink>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {subProv.placeholder}
                              </div>
                            )}
                          </Droppable>
                        )}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </nav>
    </DragDropContext>
  );
}
