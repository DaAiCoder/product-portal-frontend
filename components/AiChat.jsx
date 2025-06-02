// src/components/AiChat.jsx
"use client";

import React, { useState } from "react";

export default function AiChat({ initialPrompt = "", context = {} }) {
  const [messages, setMessages] = useState(
    initialPrompt ? [{ role: "system", content: initialPrompt }] : []
  );
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg], context }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chat error");
      setMessages((prev) => [...prev, data.message]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-96">
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
            <span
              className={`inline-block p-2 rounded ${
                msg.role === "user" ? "bg-blue-200" : "bg-gray-200"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="mt-2 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything…"
          className="flex-1 border p-2 rounded-l focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          {loading ? "…" : "Send"}
        </button>
      </form>
    </div>
  );
}
