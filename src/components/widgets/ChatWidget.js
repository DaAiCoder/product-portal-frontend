import React, { useEffect, useRef, useState } from 'react';

function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col h-full">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-2 pr-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="bg-gray-100 dark:bg-gray-700 p-2 rounded max-w-[85%] break-words"
          >
            <p className="text-sm whitespace-pre-wrap text-black dark:text-white">
              {msg.text}
            </p>
            <p className="text-xs text-right text-gray-500 mt-1">{msg.timestamp}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 px-2 py-1 border rounded dark:bg-gray-900 dark:text-white dark:border-gray-600"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWidget;
