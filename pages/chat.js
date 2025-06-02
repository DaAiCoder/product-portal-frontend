// src/pages/chat.js
import React, { useState } from 'react';

const dummyConversations = [
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/40?img=1',
    lastMessage: 'See you tomorrow!',
    time: '10:24 AM',
    messages: [
      { id: 1, sender: 'them', text: 'Hey there!', time: '10:00 AM' },
      { id: 2, sender: 'me',   text: 'Hi Alice, how are you?', time: '10:05 AM' },
      { id: 3, sender: 'them', text: "I'm good, thanks! See you tomorrow!", time: '10:24 AM' },
    ],
  },
  {
    id: 2,
    name: 'Bob Smith',
    avatar: 'https://i.pravatar.cc/40?img=2',
    lastMessage: 'Got it, thanks!',
    time: 'Yesterday',
    messages: [
      { id: 1, sender: 'them', text: 'Can you send me the report?', time: 'Yesterday' },
      { id: 2, sender: 'me',   text: 'Sure, sending now.', time: 'Yesterday' },
      { id: 3, sender: 'them', text: 'Got it, thanks!', time: 'Yesterday' },
    ],
  },
  // …add more conversations as needed
];

export default function ChatPage() {
  const [conversations] = useState(dummyConversations);
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const [draft, setDraft] = useState('');

  const selectedConv = conversations.find((c) => c.id === selectedId);

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    selectedConv.messages.push({
      id: Date.now(),
      sender: 'me',
      text: draft.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setDraft('');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto h-[600px] flex bg-white dark:bg-gray-900 shadow rounded">
      {/* Conversation List */}
      <aside className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border rounded focus:outline-none"
          />
        </div>
        <ul className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <li
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                ${conv.id === selectedId ? 'bg-gray-100 dark:bg-gray-800' : ''}
              `}
            >
              <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full" />
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <span className="font-semibold">{conv.name}</span>
                  <span className="text-xs text-gray-500">{conv.time}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm truncate">
                  {conv.lastMessage}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Message Window */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src={selectedConv.avatar}
              alt={selectedConv.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-semibold">{selectedConv.name}</div>
              <div className="text-xs text-gray-500">Online</div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50 dark:bg-gray-800">
          {selectedConv.messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xs px-4 py-2 rounded-lg
                ${msg.sender === 'me'
                  ? 'bg-blue-500 text-white ml-auto'
                  : 'bg-gray-200 text-gray-900 mr-auto'}
              `}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <footer className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSend} className="flex items-center space-x-2">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border rounded focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
