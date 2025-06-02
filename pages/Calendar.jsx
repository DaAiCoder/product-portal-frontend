// File: src/pages/Calendar.jsx

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import { RRule } from 'rrule';
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
  const [calendarView, setCalendarView] = useState('dayGridMonth');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load events from backend
  useEffect(() => {
    fetch('/api/calendar/events')
      .then((r) => r.json())
      .then(setEvents);
  }, []);

  // Load categories from backend
  useEffect(() => {
    fetch('/api/calendar/categories')
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  // Fetch US holidays (unchanged)
  useEffect(() => {
    const year = new Date().getFullYear();
    fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/US`)
      .then((r) => r.json())
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

  // Initialize visible categories map
  useEffect(() => {
    const map = {};
    categories.forEach((c) => (map[c.name] = true));
    setVisibleCategories(map);
  }, [categories]);

  // Responsive view switch
  useEffect(() => {
    const update = () =>
      setCalendarView(window.innerWidth < 768 ? 'listWeek' : 'dayGridMonth');
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Helpers
  const categoryColors = categories.reduce((m, c) => {
    m[c.name] = c.color;
    return m;
  }, {});
  const filteredEvents = events.filter(
    (e) => !e.category || visibleCategories[e.category]
  );

  function buildCalendarEvents() {
    const freqMap = {
      DAILY: RRule.DAILY,
      WEEKLY: RRule.WEEKLY,
      MONTHLY: RRule.MONTHLY,
    };
    return [
      ...holidays,
      ...filteredEvents.map((e) => {
        if (e.repeat) {
          return {
            id: e.id,
            title: e.title,
            rrule: {
              freq: freqMap[e.repeat],
              dtstart: new Date(e.start),
              ...(e.repeatUntil && { until: new Date(e.repeatUntil) }),
            },
            duration:
              new Date(e.end).getTime() - new Date(e.start).getTime() ||
              undefined,
            color: e.color,
            extendedProps: { ...e },
          };
        }
        return {
          ...e,
          color: e.color,
        };
      }),
    ];
  }

  // Handlers
  const handleDateClick = (info) => {
    setCurrentEvent({
      id: null,
      title: '',
      start: info.dateStr,
      end: info.dateStr,
      category: '',
      repeat: '',
      repeatUntil: '',
    });
    setModalOpen(true);
  };

  const handleEventClick = (info) => {
    const e = info.event;
    const cat =
      categories.find((c) => c.color === e.backgroundColor)?.name || '';
    setCurrentEvent({
      id: e.id,
      title: e.title,
      start: e.startStr,
      end: e.endStr || e.startStr,
      category: cat,
      repeat: e.extendedProps.repeat || '',
      repeatUntil: e.extendedProps.repeatUntil || '',
    });
    setModalOpen(true);
  };

  const handleEventChange = async (info) => {
    const updated = {
      id: info.event.id,
      start: info.event.startStr,
      end: info.event.endStr || info.event.startStr,
    };
    await fetch(`/api/calendar/events/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    setEvents((prev) =>
      prev.map((e) => (e.id === updated.id ? { ...e, ...updated } : e))
    );
  };

  const handleEventSubmit = async (evt) => {
    const method = evt.id ? 'PUT' : 'POST';
    const url = evt.id
      ? `/api/calendar/events/${evt.id}`
      : '/api/calendar/events';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(evt),
    });
    const saved = await res.json();
    setEvents((prev) => {
      const others = prev.filter((e) => e.id !== saved.id);
      return [...others, saved];
    });
    setModalOpen(false);
  };

  const handleEventDelete = async (evt, scope) => {
    await fetch(`/api/calendar/events/${evt.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scope }),
    });
    setEvents((prev) =>
      prev.filter((e) => (scope === 'all' ? e.id !== evt.id : e.id !== evt.id))
    );
    setModalOpen(false);
  };

  return (
    <div className="flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen((o) => !o)}
        className="md:hidden m-4 p-2 bg-gray-200 rounded"
      >
        ☰
      </button>

      {/* Sidebar / Drawer */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow p-4 transform transition-transform
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:shadow-none`}
        style={{ width: 240 }}
      >
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

      {/* Calendar */}
      <div className="flex-1 p-4 md:ml-60">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
            rrulePlugin,
          ]}
          initialView={calendarView}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          events={buildCalendarEvents()}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleEventChange}
          eventResize={handleEventChange}
          editable
          selectable
          height="auto"
        />

        <EventModal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          onSubmit={handleEventSubmit}
          onDelete={handleEventDelete}
          categories={categories}
          initialEvent={currentEvent || {}}
        />
      </div>
    </div>
  );
}
