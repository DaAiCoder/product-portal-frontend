// src/components/AiChat.jsx

import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

export default function AiChat({ initialPrompt = '', context = {} }) {
  const [messages, setMessages] = useState(
    initialPrompt ? [{ role: 'system', content: initialPrompt }] : []
  );
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    try {
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [...messages, userMsg],
      });
      const assistantMsg = response.data.choices[0].message;
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-96">
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={`inline-block p-2 rounded ${msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="mt-2 flex">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 border p-2 rounded-l focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          {loading ? '…' : 'Send'}
        </button>
      </form>
    </div>
  );
}
