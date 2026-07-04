import React, { useState } from 'react';

export default function ContactOwner({ selectedItemId, currentUser, showToast }) {
  const [messages, setMessages] = useState([
    { id: "m-1", senderName: "Alex Jones", text: "Hello! I think that asset belongs to my roommate. Can we meet up?", timestamp: "10 mins ago" }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("msgText");
    if(!input.value.trim()) return;

    setMessages(prev => [...prev, {
      id: `m-${Date.now()}`,
      senderName: currentUser?.name || "Anonymous Student",
      text: input.value,
      timestamp: "Just now"
    }]);
    input.value = "";
    showToast("Message transmitted.");
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border space-y-4">
      <h2 className="text-2xl font-black">Direct Handover Messenger</h2>
      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl max-h-60 overflow-y-auto space-y-2">
        {messages.map(m => (
          <div key={m.id} className="text-xs p-2.5 rounded-xl bg-white dark:bg-slate-800 border">
            <span className="font-bold text-blue-600 block">{m.senderName} ({m.timestamp})</span>
            <p className="text-slate-700 dark:text-slate-300 mt-0.5">{m.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input name="msgText" type="text" placeholder="Arrange exchange coordinate profiles safely..." className="flex-grow px-4 py-3 text-sm bg-slate-50 dark:bg-slate-900 rounded-xl border" />
        <button type="submit" className="bg-blue-600 text-white font-bold px-6 rounded-xl text-sm">Send</button>
      </form>
    </div>
  );
}