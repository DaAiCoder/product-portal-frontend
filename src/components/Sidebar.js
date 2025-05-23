// File: src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
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

// Define your section configurations:
const ALL_SECTIONS = {
  productivity: {
    id: 'productivity',
    label: 'Productivity',
    icon: <FaThLarge />,
    subKey: PROD_KEY,
    defaultItems: [
      { id: 'email',    to: '/email',    icon: <FaEnvelope/>,    label: 'Email' },
      { id: 'calendar', to: '/calendar', icon: <FaCalendarAlt/>, label: 'Calendar' },
      { id: 'notes',    to: '/notes',    icon: <FaStickyNote/>,  label: 'Notes' },
      { id: 'files',    to: '/files',    icon: <FaFolderOpen/>,  label: 'Files' },
      { id: 'clock',    to: '/clock',    icon: <FaClock/>,       label: 'Clock' },
    ],
  },
  social: {
    id: 'social',
    label: 'Social Feeds',
    icon: <FaShareAlt />,
    subKey: SOC_KEY,
    defaultItems: [
      { id: 'unified',   to: '/unified',   icon: <FaThLarge/>,     label: 'Unified Feed' },
      { id: 'instagram', to: '/instagram', icon: <FaInstagram/>,   label: 'Instagram' },
      { id: 'twitter',   to: '/twitter',   icon: <FaTwitter/>,     label: 'Twitter/X' },
      { id: 'facebook',  to: '/facebook',  icon: <FaFacebook/>,    label: 'Facebook' },
      { id: 'reddit',    to: '/reddit',    icon: <FaRedditAlien/>, label: 'Reddit' },
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
      { id: 'rss',      to: '/rss',      icon: <FaRss/>,   label: 'RSS Feeds' },
      { id: 'trending', to: '/trending', icon: <FaFire/>,  label: 'Trending Topics' },
    ],
  },
  media: {
    id: 'media',
    label: 'Video & Media',
    icon: <FaYoutube />,
    defaultItems: [
      { id: 'youtube',  to: '/youtube',  icon: <FaYoutube/>, label: 'YouTube Feeds' },
      { id: 'music',    to: '/music',    icon: <FaMusic/>,   label: 'Music Discovery' },
      { id: 'podcasts', to: '/podcasts', icon: <FaPodcast/>, label: 'Podcasts' },
    ],
  },
};

export default function Sidebar() {
  const location = useLocation();

  // --- Section order state ---
  const [sectionOrder, setSectionOrder] = useState(() => {
    const saved = localStorage.getItem(SECTION_KEY);
    return saved
      ? JSON.parse(saved)
      : Object.keys(ALL_SECTIONS);
  });

  // --- Sub-menu state (prod + social) ---
  const [prodItems, setProdItems] = useState(() => {
    const saved = localStorage.getItem(PROD_KEY);
    if (saved) {
      const ids = JSON.parse(saved);
      return ids
        .map(id => ALL_SECTIONS.productivity.defaultItems.find(i => i.id === id))
        .filter(Boolean);
    }
    return ALL_SECTIONS.productivity.defaultItems;
  });
  const [socItems, setSocItems] = useState(() => {
    const saved = localStorage.getItem(SOC_KEY);
    if (saved) {
      const ids = JSON.parse(saved);
      return ids
        .map(id => ALL_SECTIONS.social.defaultItems.find(i => i.id === id))
        .filter(Boolean);
    }
    return ALL_SECTIONS.social.defaultItems;
  });

  // Expand/collapse state per section
  const [openSections, setOpenSections] = useState({});

  // Sidebar collapsed?
  const [collapsed, setCollapsed] = useState(false);

  // Helpers to detect active
  const isSectionActive = (sec) => {
    if (sec.subKey === PROD_KEY) {
      return prodItems.some(i => location.pathname.startsWith(i.to));
    }
    if (sec.subKey === SOC_KEY) {
      return socItems.some(i => location.pathname.startsWith(i.to));
    }
    if (sec.defaultItems) {
      return sec.defaultItems.some(i => location.pathname.startsWith(i.to));
    }
    if (sec.to) {
      return location.pathname === sec.to;
    }
    return false;
  };

  // Handle any drag & drop
  const onDragEnd = ({ source, destination, draggableId, type }) => {
    if (!destination) return;

    // 1) Reordering sections
    if (type === 'SECTION') {
      const items = Array.from(sectionOrder);
      items.splice(source.index, 1);
      items.splice(destination.index, 0, draggableId);
      setSectionOrder(items);
      localStorage.setItem(SECTION_KEY, JSON.stringify(items));
      return;
    }

    // 2) Reordering prod or social sub-menus
    if (source.droppableId === PROD_KEY && destination.droppableId === PROD_KEY) {
      const items = Array.from(prodItems);
      const [m] = items.splice(source.index, 1);
      items.splice(destination.index, 0, m);
      setProdItems(items);
      localStorage.setItem(PROD_KEY, JSON.stringify(items.map(i => i.id)));
    }
    if (source.droppableId === SOC_KEY && destination.droppableId === SOC_KEY) {
      const items = Array.from(socItems);
      const [m] = items.splice(source.index, 1);
      items.splice(destination.index, 0, m);
      setSocItems(items);
      localStorage.setItem(SOC_KEY, JSON.stringify(items.map(i => i.id)));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <nav className={`
        fixed top-0 left-0 h-full bg-white shadow-lg flex flex-col py-4
        transition-all duration-300 z-30 ${collapsed ? 'w-16' : 'w-64'}
      `}>
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="p-2 mx-2 rounded hover:bg-gray-100 transition-colors"
        >
          <FaBars size={20} />
        </button>

        {/* Sections */}
        <Droppable droppableId="sections" type="SECTION">
          {(prov) => (
            <div
              ref={prov.innerRef}
              {...prov.droppableProps}
              className="flex-1 overflow-y-auto"
            >
              {sectionOrder.map((secId, idx) => {
                const sec = ALL_SECTIONS[secId];
                const active = isSectionActive(sec);
                const isOpen = openSections[secId];

                return (
                  <Draggable key={sec.id} draggableId={sec.id} index={idx}>
                    {(p) => (
                      <div
                        ref={p.innerRef}
                        {...p.draggableProps}
                        className="mb-4"
                      >
                        {/* Section header */}
                        <div className="flex items-center">
                          <button
                            onClick={() => setOpenSections(os => ({
                              ...os, [secId]: !os[secId]
                            }))}
                            className={`
                              flex items-center w-full px-4 py-2 rounded
                              ${active ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}
                              hover:bg-gray-100 transition-colors
                            `}
                          >
                            <span {...p.dragHandleProps} className="mr-3 cursor-move">
                              {sec.icon}
                            </span>
                            {!collapsed && <span>{sec.label}</span>}
                            {!collapsed && sec.defaultItems && (
                              <span className="ml-auto">
                                {isOpen ? '−' : '+'}
                              </span>
                            )}
                          </button>
                        </div>

                        {/* Sub-menu drag/drop */}
                        {sec.subKey === PROD_KEY && !collapsed && isOpen && (
                          <Droppable droppableId={PROD_KEY} type="ITEM">
                            {(prov2) => (
                              <div
                                ref={prov2.innerRef}
                                {...prov2.droppableProps}
                                className="ml-8 mt-1 space-y-1"
                              >
                                {prodItems.map((item, i) => (
                                  <Draggable key={item.id} draggableId={item.id} index={i}>
                                    {(p2) => (
                                      <NavLink
                                        to={item.to}
                                        ref={p2.innerRef}
                                        {...p2.draggableProps}
                                        {...p2.dragHandleProps}
                                        className={({ isActive }) => `
                                          flex items-center px-4 py-2 rounded
                                          ${isActive ? 'bg-blue-200 text-white' : 'text-gray-700'}
                                          hover:bg-gray-100 transition-colors
                                        `}
                                      >
                                        {item.icon}
                                        <span className="ml-3">{item.label}</span>
                                      </NavLink>
                                    )}
                                  </Draggable>
                                ))}
                                {prov2.placeholder}
                              </div>
                            )}
                          </Droppable>
                        )}

                        {sec.subKey === SOC_KEY && !collapsed && isOpen && (
                          <Droppable droppableId={SOC_KEY} type="ITEM">
                            {(prov2) => (
                              <div
                                ref={prov2.innerRef}
                                {...prov2.droppableProps}
                                className="ml-8 mt-1 space-y-1"
                              >
                                {socItems.map((item, i) => (
                                  <Draggable key={item.id} draggableId={item.id} index={i}>
                                    {(p2) => (
                                      <NavLink
                                        to={item.to}
                                        ref={p2.innerRef}
                                        {...p2.draggableProps}
                                        {...p2.dragHandleProps}
                                        className={({ isActive }) => `
                                          flex items-center px-4 py-2 rounded
                                          ${isActive ? 'bg-green-200 text-white' : 'text-gray-700'}
                                          hover:bg-gray-100 transition-colors
                                        `}
                                      >
                                        {item.icon}
                                        <span className="ml-3">{item.label}</span>
                                      </NavLink>
                                    )}
                                  </Draggable>
                                ))}
                                {prov2.placeholder}
                              </div>
                            )}
                          </Droppable>
                        )}

                        {/* Static sub-menus */}
                        {sec.defaultItems && sec.subKey == null && !collapsed && isOpen && (
                          <div className="ml-8 mt-1 space-y-1">
                            {sec.defaultItems.map(i => (
                              <NavLink
                                key={i.id}
                                to={i.to}
                                className={({ isActive }) => `
                                  flex items-center px-4 py-2 rounded
                                  ${isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700'}
                                  hover:bg-gray-100 transition-colors
                                `}
                              >
                                {i.icon}
                                <span className="ml-3">{i.label}</span>
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                );
              })}

              {prov.placeholder}
            </div>
          )}
        </Droppable>
      </nav>
    </DragDropContext>
  );
}

