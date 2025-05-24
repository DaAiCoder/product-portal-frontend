// File: src/pages/Calendar.jsx

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { v4 as uuidv4 } from 'uuid';

import CategoryManager from '../components/CategoryManager';
import CategoryLegend from '../components/CategoryLegend';
import EventModal from '../components/EventModal';

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Load user events
  useEffect(() => {
    const saved = localStorage.getItem('calendarEvents');
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  // Persist user events
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  // Fetch US public holidays
  useEffect(() => {
    const year = new Date().getFullYear();
    fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/US`)
      .then((res) => res.json())
      .then((data) =>
        setHolidays(
          data.map((h) => ({
            id: h.date,
            title: h.localName,
            start: h.date,
            allDay: true,
            color: '#ff495c',
          }))
        )
      )
      .catch(console.error);
  }, []);

  // Reinitialize visibleCategories whenever categories change
  useEffect(() => {
    const map = {};
    categories.forEach((c) => {
      map[c.name] = true;
    });
    setVisibleCategories(map);
  }, [categories]);

  // Map category names to their colors
  const categoryColors = categories.reduce((m, c) => {
    m[c.name] = c.color;
    return m;
  }, {});

  // Filter events by category (holidays always show)
  const filteredEvents = events.filter((e) =>
    e.category ? visibleCategories[e.category] : true
  );

  // Handlers
  const handleDateClick = (info) => {
    setCurrentEvent({
      id: null,
      title: '',
      start: info.dateStr,
      end: info.dateStr,
      category: '',
    });
    setModalOpen(true);
  };

  const handleEventClick = (info) => {
    const e = info.event;
    const catName =
      Object.keys(categoryColors).find(
        (name) => categoryColors[name] === e.backgroundColor
      ) || '';
    setCurrentEvent({
      id: e.id,
      title: e.title,
      start: e.startStr,
      end: e.endStr || e.startStr,
      category: catName,
    });
    setModalOpen(true);
  };

  const handleEventChange = (info) => {
    const { id, startStr, endStr } = info.event;
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, start: startStr, end: endStr || startStr }
          : e
      )
    );
  };

  return (
    <div className="flex p-6 space-x-4">
      <div className="w-64 space-y-4">
        <CategoryManager onCategoriesChange={setCategories} />
        {categories.length > 0 && (
          <CategoryLegend
            categories={categories}
            visibleCategories={visibleCategories}
            onToggleCategory={(name) =>
              setVisibleCategories((prev) => ({
                ...prev,
                [name]: !prev[name],
              }))
            }
          />
        )}
      </div>
      <div className="flex-1">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={[...holidays, ...filteredEvents.map((e) => ({
            ...e,
            color: categoryColors[e.category] || e.color || '#3788d8',
          }))]}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          editable={true}
          selectable={true}
          eventDrop={handleEventChange}
          eventResize={handleEventChange}
          height="auto"
        />
        <EventModal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          onSubmit={(evt) => {
            setEvents((prev) => {
              // remove old if exists
              const others = prev.filter((e) => e.id !== evt.id);
              return [
                ...others,
                {
                  ...evt,
                  id: evt.id || uuidv4(),
                  color:
                    categoryColors[evt.category] ||
                    evt.color ||
                    '#3788d8',
                },
              ];
            });
          }}
          categories={categories}
          initialEvent={currentEvent || {}}
        />
      </div>
    </div>
  );
}
