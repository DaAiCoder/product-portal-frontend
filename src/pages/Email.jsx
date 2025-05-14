// File: src/pages/EmailPage.jsx
import React, { useState } from 'react';
import {
  FaInbox,
  FaPaperPlane,
  FaTrash,
  FaReply,
  FaReplyAll,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';

const DUMMY_EMAILS = [
  {
    id: 1,
    folder: 'inbox',
    sender: 'Alice Johnson',
    subject: 'Project Update',
    snippet: 'Hey, just wanted to let you know that we finished the draft...',
    date: 'May 13, 2025',
    body: `
      Hi there,

      I’m pleased to let you know that the project draft is now complete.
      Please review and let me know if you have any feedback.

      Best,
      Alice
    `,
  },
  {
    id: 2,
    folder: 'inbox',
    sender: 'Bob Smith',
    subject: 'Meeting Tomorrow',
    snippet: 'Don’t forget our sync at 10am tomorrow to discuss the roadmap...',
    date: 'May 12, 2025',
    body: `
      Hello,

      Looking forward to our meeting tomorrow at 10 AM to go over the
      product roadmap. Let me know if you need anything beforehand.

      Cheers,
      Bob
    `,
  },
  {
    id: 3,
    folder: 'sent',
    sender: 'You',
    subject: 'Re: Project Update',
    snippet: 'Thanks, Alice! I’ll take a look and get back to you by EOD...',
    date: 'May 13, 2025',
    body: `
      Hi Alice,

      Thanks for sending over the draft. I’ll review it by the end of
      today and send any comments your way.

      Best,
      You
    `,
  },
];

export default function EmailPage() {
  const [folder, setFolder] = useState('inbox');
  const [selectedId, setSelectedId] = useState(
    DUMMY_EMAILS.find((e) => e.folder === 'inbox')?.id || null
  );

  const emails = DUMMY_EMAILS.filter((e) => e.folder === folder);
  const selected = DUMMY_EMAILS.find((e) => e.id === selectedId);

  return (
    <div className="h-full flex overflow-hidden">
      {/* Sidebar folders */}
      <div className="w-1/5 bg-gray-100 dark:bg-gray-800 p-4 flex flex-col space-y-4">
        <button
          onClick={() => {
            setFolder('inbox');
            setSelectedId(DUMMY_EMAILS.find((e) => e.folder === 'inbox')?.id);
          }}
          className={`flex items-center space-x-2 p-2 rounded ${
            folder === 'inbox'
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <FaInbox />
          <span>Inbox</span>
        </button>
        <button
          onClick={() => {
            setFolder('sent');
            setSelectedId(DUMMY_EMAILS.find((e) => e.folder === 'sent')?.id);
          }}
          className={`flex items-center space-x-2 p-2 rounded ${
            folder === 'sent'
              ? 'bg-green-500 text-white'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <FaPaperPlane />
          <span>Sent</span>
        </button>
        <button
          onClick={() => {
            setFolder('trash');
            setSelectedId(null);
          }}
          className={`flex items-center space-x-2 p-2 rounded ${
            folder === 'trash'
              ? 'bg-red-500 text-white'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <FaTrash />
          <span>Trash</span>
        </button>
      </div>

      {/* Email list */}
      <div className="w-1/4 border-r border-gray-300 dark:border-gray-700 overflow-auto">
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => setSelectedId(email.id)}
            className={`p-4 cursor-pointer border-b border-gray-200 dark:border-gray-700 ${
              email.id === selectedId
                ? 'bg-gray-200 dark:bg-gray-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {email.sender}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {email.date}
              </span>
            </div>
            <div className="mt-1">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {email.subject}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {email.snippet}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Email content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {selected ? (
          <>
            {/* Toolbar */}
            <div className="flex items-center space-x-4 p-4 border-b border-gray-300 dark:border-gray-700">
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                <FaArrowLeft />
              </button>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                <FaArrowRight />
              </button>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                <FaReply />
              </button>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                <FaReplyAll />
              </button>
            </div>

            {/* Header */}
            <div className="p-6 border-b border-gray-300 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {selected.subject}
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                From: {selected.sender} | Date: {selected.date}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 flex-1 overflow-auto whitespace-pre-wrap text-gray-800 dark:text-gray-200">
              {selected.body}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            No messages in this folder.
          </div>
        )}
      </div>
    </div>
  );
}
