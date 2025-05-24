// src/components/EventModal.jsx

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement('#root');

export default function EventModal({
  isOpen,
  onRequestClose,
  onSubmit,
  categories,
  initialEvent = {},
}) {
  const [title, setTitle] = useState(initialEvent.title || '');
  const [start, setStart] = useState(
    initialEvent.start ? new Date(initialEvent.start) : new Date()
  );
  const [end, setEnd] = useState(
    initialEvent.end ? new Date(initialEvent.end) : new Date()
  );
  const [category, setCategory] = useState(initialEvent.category || '');

  useEffect(() => {
    setTitle(initialEvent.title || '');
    setStart(initialEvent.start ? new Date(initialEvent.start) : new Date());
    setEnd(initialEvent.end ? new Date(initialEvent.end) : new Date());
    setCategory(initialEvent.category || '');
  }, [initialEvent, isOpen]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSubmit({
      ...initialEvent,
      title: title.trim(),
      start: start.toISOString(),
      end: end.toISOString(),
      category,
    });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Event Editor"
      className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center"
    >
      <h2 className="text-xl mb-4">
        {initialEvent.id ? 'Edit Event' : 'New Event'}
      </h2>
      <div className="space-y-3">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Start</label>
          <DatePicker
            selected={start}
            onChange={(date) => setStart(date)}
            showTimeSelect
            dateFormat="Pp"
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">End</label>
          <DatePicker
            selected={end}
            onChange={(date) => setEnd(date)}
            showTimeSelect
            dateFormat="Pp"
            className="w-full border p-2 rounded"
          />
        </div>
        {categories.length > 0 && (
          <div>
            <label className="block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">None</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        <button onClick={onRequestClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">
          Save
        </button>
      </div>
    </Modal>
  );
}
