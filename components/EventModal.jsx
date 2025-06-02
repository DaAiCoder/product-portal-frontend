// File: src/components/EventModal.jsx

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Attach modal to root
Modal.setAppElement('#root');

export default function EventModal({
  isOpen,
  onRequestClose,
  onSubmit,
  onDelete,
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
  const [repeat, setRepeat] = useState(initialEvent.repeat || '');
  const [repeatUntil, setRepeatUntil] = useState(
    initialEvent.repeatUntil ? new Date(initialEvent.repeatUntil) : null
  );

  // Reset when modal opens
  useEffect(() => {
    setTitle(initialEvent.title || '');
    setStart(initialEvent.start ? new Date(initialEvent.start) : new Date());
    setEnd(initialEvent.end ? new Date(initialEvent.end) : new Date());
    setCategory(initialEvent.category || '');
    setRepeat(initialEvent.repeat || '');
    setRepeatUntil(
      initialEvent.repeatUntil ? new Date(initialEvent.repeatUntil) : null
    );
  }, [initialEvent, isOpen]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSubmit({
      ...initialEvent,
      title: title.trim(),
      start: start.toISOString(),
      end: end.toISOString(),
      category,
      repeat,
      repeatUntil: repeatUntil ? repeatUntil.toISOString() : '',
    });
    onRequestClose();
  };

  const handleDelete = () => {
    if (!initialEvent.id) return onRequestClose();
    let scope = 'one';
    if (repeat) {
      const ans = window.prompt(
        'Delete single occurrence or entire series? (enter "one" or "all")',
        'one'
      );
      if (ans === 'all') scope = 'all';
    }
    onDelete(initialEvent, scope);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Event Editor"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-start justify-center"
      className="relative z-60 max-w-md w-full mt-16 bg-white p-6 rounded shadow-xl outline-none"
    >
      {initialEvent.id && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      )}
      <h2 className="text-xl mb-4 font-semibold">
        {initialEvent.id ? 'Edit Event' : 'New Event'}
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white text-gray-900 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Start</label>
          <DatePicker
            selected={start}
            onChange={setStart}
            showTimeSelect
            dateFormat="Pp"
            className="w-full bg-white text-gray-900 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">End</label>
          <DatePicker
            selected={end}
            onChange={setEnd}
            showTimeSelect
            dateFormat="Pp"
            className="w-full bg-white text-gray-900 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        {categories.length > 0 && (
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white text-gray-900 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
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
        <div>
          <label className="block mb-1 font-medium">Repeat</label>
          <select
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
            className="w-full bg-white text-gray-900 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">None</option>
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
          </select>
        </div>
        {repeat && (
          <div>
            <label className="block mb-1 font-medium">Repeat Until</label>
            <DatePicker
              selected={repeatUntil}
              onChange={setRepeatUntil}
              dateFormat="Pp"
              className="w-full bg-white text-gray-900 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        <button
          onClick={onRequestClose}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
