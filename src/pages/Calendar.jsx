// src/pages/Calendar.jsx

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
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

  // --- Load / persist user events ---
  useEffect(() => {
    const saved = localStorage.getItem('calendarEvents');
    if (saved) setEvents(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  // --- Fetch US public holidays ---
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

  // --- Load / persist categories & init visible map ---
  useEffect(() => {
    const saved = localStorage.getItem('calendarCategories');
    if (saved) setCategories(JSON.parse(saved));
  }, []);
  useEffect(() => {
    const map = {};
    categories.forEach((c) => {
      map[c.name] = true;
    });
    setVisibleCategories(map);
  }, [categories]);

  // Map string -> RRule freq constant
  const freqMap = {
    DAILY: RRule.DAILY,
    WEEKLY: RRule.WEEKLY,
    MONTHLY: RRule.MONTHLY,
  };

  // --- Handlers ---
  const handleDateClick = (info) => {
    setCurrentEvent({
      id: null,
      title: '',
      start: info.dateStr,
      end: info.dateStr,
      category: '',
      repeat: '',        // NEW FIELD
      repeatUntil: '',   // NEW FIELD
    });
    setModalOpen(true);
  };

  const handleEventClick = (info) => {
    const e = info.event;
    // find category name by color
    const catName =
      categories.find((c) => c.color === e.backgroundColor)?.name || '';
    setCurrentEvent({
      id: e.id,
      title: e.title,
      start: e.startStr,
      end: e.endStr || e.startStr,
      category: catName,
      repeat: info.event.extendedProps.repeat || '',
      repeatUntil: info.event.extendedProps.repeatUntil || '',
    });
    setModalOpen(true);
  };

  const handleEventChange = (info) => {
    // drop or resize
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
          color: categories.find((c) => c.name === evt.category)?.color || '#3788d8',
        },
      ];
    });
    setModalOpen(false);
  };

  // Build FC-compatible events, converting repeats into rrule
  const buildCalendarEvents = () => {
    const list = [
      ...holidays,
      ...events
        .filter((e) => !e.category || visibleCategories[e.category])
        .map((e) => {
          if (e.repeat) {
            // recurring event
            const rule = {
              freq: freqMap[e.repeat],
              dtstart: new Date(e.start),
            };
            if (e.repeatUntil) rule.until = new Date(e.repeatUntil);
            return {
              id: e.id,
              title: e.title,
              rrule: rule,
              // optionally include duration if you want timed repeats:
              duration:
                new Date(e.end).getTime() - new Date(e.start).getTime() || undefined,
              color: e.color,
              extendedProps: {
                repeat: e.repeat,
                repeatUntil: e.repeatUntil,
              },
            };
          } else {
            return {
              id: e.id,
              title: e.title,
              start: e.start,
              end: e.end,
              color: e.color,
            };
          }
        }),
    ];
    return list;
  };

  return (
    <div className="flex p-6 space-x-4">
      {/* Sidebar: Category Manager + Legend */}
      <div className="w-64 space-y-4">
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
      </div>

      {/* Calendar */}
      <div className="flex-1">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            rrulePlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={buildCalendarEvents()}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleEventChange}
          eventResize={handleEventChange}
          editable={true}
          selectable={true}
          height="auto"
        />

        {/* Modal for create/edit */}
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
