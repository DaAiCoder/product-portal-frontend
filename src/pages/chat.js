import React from 'react';
import ChatWidget from '../components/widgets/ChatWidget';

export default function ChatPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <div className="bg-white dark:bg-gray-900 shadow rounded p-4 h-[600px]">
        <ChatWidget />
      </div>
    </div>
  );
}
