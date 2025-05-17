import React, { useState, useRef, useEffect } from 'react';
import ChatWidget from '../components/widgets/ChatWidget';

export default ChatWidget;


function ChatWidget() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'system', text: 'Welcome to the chat!', time: new Date() },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'You',
      text: input.trim(),
      time: new Date(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 px-2 py-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded max-w-[80%] ${
              msg.sender === 'You'
                ? 'bg-blue-600 text-white self-end'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white self-start'
            }`}
          >
            <div className="text-sm">{msg.text}</div>
            <div className="text-xs text-right mt-1 opacity-60">
              {msg.time.toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex border-t dark:border-gray-700 p-2 space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default {
  id: 'chat',
  defaultTitle: 'Chat',
  defaultW: 6,
  defaultH: 8,
  Component: ChatWidget,
};
