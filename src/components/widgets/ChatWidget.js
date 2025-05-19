import React, { useEffect, useRef, useState } from 'react';
import EmojiButton from '../EmojiButton';

function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMsg = {
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');
  };

  const insertEmoji = (emoji) => {
    const el = inputRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const updated = input.slice(0, start) + emoji + input.slice(end);
    setInput(updated);
    setTimeout(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = start + emoji.length;
    }, 0);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 mb-2 pr-1">
        {messages.map((msg, i) => (
          <div
            key={i
