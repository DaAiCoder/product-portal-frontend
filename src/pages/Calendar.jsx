// File: src/pages/Calendar.jsx

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { v4 as uuidv4 } from 'uuid';
import CategoryManager from '../components/CategoryManager';

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [categories, setCategories] = useState([]);

  // Load user events
  useEffect(() => {
    const saved = localStorage.getItem('calendarEvents');
    if (saved) setEvents(JSON.parse(saved));
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

  // Build map of category name to color
  const categoryColors = categories.reduce((map, c) => {
    map[c.name] = c.color;
    return map;
  }, {});

  const handleDateClick = (info) => {
    const title = prompt('Event title:');
    if (!title) return;
    if (categories.length) {
      const cat = prompt(
        'Category name (' + categories.map((c) => c.name).join(', ') + '):'
      );
      const color = categoryColors[cat] || '#3788d8';
      const newEvent = {
        id: uuidv4(),
        title,
        start: info.dateStr,
        color,
      };
      setEvents((prev) => [...prev, newEvent]);
    } else {
      // no categories defined yet
      const newEvent = {
        id: uuidv4(),
        title,
        start: info.dateStr,
        color: '#3788d8',
      };
      setEvents((prev) => [...prev, newEvent]);
    }
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
          events={[...holidays, ...events]}
          dateClick={handleDateClick}
          editable={true}
          selectable={true}
          eventClick={(info) => {
            if (
              window.confirm(
                `Delete event '${info.event.title}'?`
              )
            ) {
              setEvents((prev) =>
                prev.filter((e) => e.id !== info.event.id)
              );
            }
          }}
          height="auto"
        />
      </div>
    </div>
  );
}
