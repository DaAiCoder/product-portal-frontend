// src/pages/Calendar.jsx

// FullCalendar core styles
import '@fullcalendar/common/main.css';
// Plugin styles from dist folders
import '@fullcalendar/daygrid/dist/main.css';
import '@fullcalendar/timegrid/dist/main.css';

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { v4 as uuidv4 } from 'uuid';

import CategoryManager from '../components/CategoryManager';
import EventModal from '../components/EventModal';

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Load user events
  useEffect(() => {
    const saved = localStorage.getItem('calendarEvents');
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  // Persist user events
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  // Fetch US public holidays for current year
  useEffect(() => {
    const year = new Date().getFullYear();
    fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/US`)
      .then((res) => res.json())
      .then((data) => {
        setHolidays(
          data.map((h) => ({
            id: h.date,
            title: h.localName,
            start: h.date,
            allDay: true,
            color: '#ff495c',
          }))
        );
      })
      .catch(console.error);
  }, []);

  // Build map: category name -> color
  const categoryColors = categories.reduce((map, c) => {
    map[c.name] = c.color;
    return map;
  }, {});

  // Open modal to create new event
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

  // Open modal to edit existing event
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

  return (
    <div className="flex p-6 space-x-4">
      <div className="w-64">
        <CategoryManager onCategoriesChange={setCategories} />
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
          events={[
            ...holidays,
            ...events.map((e) => ({
              ...e,
              color: categoryColors[e.category] || e.color || '#3788d8',
            })),
          ]}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          editable={true}
          selectable={true}
          height="auto"
        />
        <EventModal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          onSubmit={(evt) => {
            setEvents((prev) => {
              const filtered = prev.filter((e) => e.id !== evt.id);
              return [
                ...filtered,
                {
                  ...evt,
                  id: evt.id || uuidv4(),
                  color: categoryColors[evt.category] || '#3788d8',
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
