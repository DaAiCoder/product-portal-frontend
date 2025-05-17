import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

function ChatWidget() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'system', text: 'Welcome to the chat!', time: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
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
    setShowEmoji(false);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const onEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center px-3 py-2 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold">Chat</h2>
        <button
          onClick={clearChat}
          className="text-sm text-red-500 hover:underline"
        >
          Clear Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 px-2 py-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded max-w-[80%] break-words whitespace-pre-wrap ${
              msg.sender === 'You'
                ? 'bg-blue-600 text-white self-end'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white self-start'
            }`}
          >
            <div className="text-sm">{msg.text}</div>
            <div className="text-xs text-right mt-1 opacity-60">
              {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 p-2 border-t dark:border-gray-700">
        <button
          onClick={() => setShowEmoji((prev) => !prev)}
          className="text-xl"
        >
          😊
        </button>
        {showEmoji && (
          <div className="absolute bottom-20 z-50">
            <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
          </div>
        )}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
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
