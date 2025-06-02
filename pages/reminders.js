// src/pages/reminders.js
import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import AiPromptModal from '../components/AiPromptModal';

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [showForm, setShowForm]   = useState(false);
  const [title, setTitle]         = useState('');
  const [datetime, setDatetime]   = useState('');
  const [aiOpen, setAiOpen]       = useState(false);

  const handleAddClick = () => setShowForm(true);
  const handleCancel   = () => {
    setShowForm(false);
    setTitle('');
    setDatetime('');
  };
  const handleSubmit   = e => {
    e.preventDefault();
    if (!title || !datetime) return;
    setReminders([...reminders, { id: Date.now(), title, datetime }]);
    setShowForm(false);
    setTitle('');
    setDatetime('');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reminders</h1>
        <button
          onClick={() => setAiOpen(true)}
          className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          <FaRobot /><span>AI</span>
        </button>
      </div>

      <AiPromptModal
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
        defaultPrompt="Suggest smart reminders based on my upcoming tasks."
        context={{ reminders }}
      />

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-6 max-w-md">
          {/* ...existing form fields... */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border-gray-300 border rounded p-2"
              placeholder="Reminder title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Due Date &amp; Time</label>
            <input
              type="datetime-local"
              value={datetime}
              onChange={e => setDatetime(e.target.value)}
              className="w-full border-gray-300 border rounded p-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* List */}
      {reminders.length > 0 ? (
        <div className="space-y-4">
          {reminders.map(rem => (
            <div
              key={rem.id}
              className="border border-gray-200 rounded p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{rem.title}</h2>
                <span className="text-gray-500 text-sm">
                  {new Date(rem.datetime).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No reminders yet. Click “Add Reminder” to get started.</p>
      )}
    </div>
  );
}
