// src/pages/Calendar.jsx

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import { RRule } from 'rrule';
import { v4 as uuidv4 } from 'uuid';
import { createEvents } from 'ics';
import ICAL from 'ical.js';

import CategoryManager from '../components/CategoryManager';
import CategoryLegend from '../components/CategoryLegend';
import EventModal from '../components/EventModal';

export default function CalendarPage() {
  // State
  const [events, setEvents] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [calendarView, setCalendarView] = useState('dayGridMonth');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load / persist events
  useEffect(() => {
    const saved = localStorage.getItem('calendarEvents');
    if (saved) setEvents(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  // Load / persist categories
  useEffect(() => {
    const saved = localStorage.getItem('calendarCategories');
    if (saved) setCategories(JSON.parse(saved));
  }, []);
  useEffect(() => {
    const map = {};
    categories.forEach((c) => (map[c.name] = true));
    setVisibleCategories(map);
    localStorage.setItem('calendarCategories', JSON.stringify(categories));
  }, [categories]);

  // Fetch US holidays
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

  // Responsive: switch to listWeek under 768px
  useEffect(() => {
    const update = () =>
      setCalendarView(window.innerWidth < 768 ? 'listWeek' : 'dayGridMonth');
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Category→color map
  const categoryColors = categories.reduce((m, c) => {
    m[c.name] = c.color;
    return m;
  }, {});

  // Filter out hidden categories
  const filteredEvents = events.filter(
    (e) => !e.category || visibleCategories[e.category]
  );

  // Build events array for FullCalendar (including RRule)
  function buildCalendarEvents() {
    const freqMap = {
      DAILY: RRule.DAILY,
      WEEKLY: RRule.WEEKLY,
      MONTHLY: RRule.MONTHLY,
    };
    const user = filteredEvents.map((e) => {
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
            new Date(e.end).getTime() - new Date(e.start).getTime() || undefined,
          color: e.color,
          extendedProps: { ...e },
        };
      } else {
        return { ...e, color: e.color };
      }
    });
    return [...holidays, ...user];
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

  const handleEventChange = (info) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === info.event.id
          ? { ...e, start: info.event.startStr, end: info.event.endStr || info.event.startStr }
          : e
      )
    );
  };

  const handleEventSubmit = (evt) => {
    setEvents((prev) => {
      const others = prev.filter((e) => e.id !== evt.id);
      return [
        ...others,
        {
          ...evt,
          id: evt.id || uuidv4(),
          color: categoryColors[evt.category] || '#3788d8',
        },
      ];
    });
    setModalOpen(false);
  };

  // ICS Export
  const exportIcs = () => {
    const icsEvents = events.map((e) => ({
      title: e.title,
      start: [
        new Date(e.start).getFullYear(),
        new Date(e.start).getMonth() + 1,
        new Date(e.start).getDate(),
        new Date(e.start).getHours(),
        new Date(e.start).getMinutes(),
      ],
      end: [
        new Date(e.end).getFullYear(),
        new Date(e.end).getMonth() + 1,
        new Date(e.end).getDate(),
        new Date(e.end).getHours(),
        new Date(e.end).getMinutes(),
      ],
      uid: e.id,
    }));
    createEvents(icsEvents, (error, value) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([value], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'calendar.ics';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  // ICS Import
  const importIcs = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const jcal = ICAL.parse(evt.target.result);
        const comp = new ICAL.Component(jcal);
        const vevents = comp.getAllSubcomponents('vevent');
        const parsed = vevents.map((ve) => {
          const ev = new ICAL.Event(ve);
          return {
            id: uuidv4(),
            title: ev.summary,
            start: ev.startDate.toString(),
            end: ev.endDate.toString(),
            category: '',
            repeat: '',
            repeatUntil: '',
          };
        });
        setEvents((prev) => [...prev, ...parsed]);
      } catch (err) {
        console.error('ICS parse error', err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex">
      {/* Mobile toggle */}
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
              setVisibleCategories((prev) => ({ ...prev, [name]: !prev[name] }))
            }
          />
        )}

        <div className="mt-4">
          <button
            onClick={exportIcs}
            className="w-full mb-2 px-3 py-1 bg-green-500 text-white rounded"
          >
            Export .ics
          </button>
          <input
            type="file"
            accept=".ics"
            onChange={importIcs}
            className="w-full"
          />
        </div>
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
          onDelete={(evt) => {
            setEvents((prev) => prev.filter((e) => e.id !== evt.id));
            setModalOpen(false);
          }}
          categories={categories}
          initialEvent={currentEvent || {}}
        />
      </div>
    </div>
  );
}
