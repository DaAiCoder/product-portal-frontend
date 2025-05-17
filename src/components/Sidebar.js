// File: src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaBars } from 'react-icons/fa';
import { sidebarSections } from '../utils/sidebarLinks';

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(
    () => JSON.parse(localStorage.getItem('sidebarCollapsed')) || false
  );
  const [openSections, setOpenSections] = useState({ productivity: true, social: true });

  const onDragEnd = ({ source, destination }) => {
    if (!destination || source.droppableId !== destination.droppableId) return;

    const section = sidebarSections.find((s) => s.id === source.droppableId);
    if (!section || !section.items) return;

    const copy = Array.from(section.items);
    const [moved] = copy.splice(source.index, 1);
    copy.splice(destination.index, 0, moved);
    section.items = copy;
  };

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
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

        {sidebarSections.map((section) => {
          if (section.items) {
            const isOpen = openSections[section.id];
            const isActive = section.items.some((item) => location.pathname.startsWith(item.to));
            const color = section.color;

            return (
              <div key={section.id} className="mt-4 relative">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full flex items-center px-4 py-2 rounded ${
                    isActive
                      ? `bg-${color}-500 text-white dark:bg-${color}-400`
                      : 'text-gray-600 dark:text-gray-300'
                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                >
                  {section.icon}
                  {!collapsed && <span className="ml-3">{section.label}</span>}
                </button>

                {!collapsed && isOpen && (
                  <Droppable droppableId={section.id}>
                    {(provided) => (
                      <div
                        className="mt-1"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {section.items.map((item, idx) => (
                          <Draggable key={item.id} draggableId={item.id} index={idx}>
                            {(prov) => (
                              <NavLink
                                to={item.to}
                                ref={prov.innerRef}
                                {...prov.draggableProps}
                                {...prov.dragHandleProps}
                                className={({ isActive }) =>
                                  `flex items-center px-8 py-2 rounded mb-1 ${
                                    isActive
                                      ? `bg-${color}-500 text-white dark:bg-${color}-400`
                                      : 'text-gray-600 dark:text-gray-300'
                                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`
                                }
                              >
                                {item.icon}
                                <span className="ml-3">{item.label}</span>
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
            );
          } else {
            return (
              <div key={section.id} className="mt-4">
                <NavLink
                  to={section.to}
                  className={({ isActive }) =>
                    `w-full flex items-center px-4 py-2 rounded ${
                      isActive
                        ? `bg-${section.color}-500 text-white dark:bg-${section.color}-400`
                        : 'text-gray-600 dark:text-gray-300'
                    } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`
                  }
                >
                  {section.icon}
                  {!collapsed && <span className="ml-3">{section.label}</span>}
                </NavLink>
              </div>
            );
          }
        })}
      </nav>
    </DragDropContext>
  );
}
