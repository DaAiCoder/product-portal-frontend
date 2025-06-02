import React from 'react';

const ChatWidget = () => {
  return (
    <div className="p-4 text-sm text-gray-800 dark:text-gray-100">
      <p><strong>Chat Widget:</strong> Coming soon!</p>
    </div>
  );
};

const chat = {
  id: 'chat',
  defaultTitle: 'Chat',
  Component: ChatWidget,
};

export default chat;
