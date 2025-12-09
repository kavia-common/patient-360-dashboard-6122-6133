import React, { useRef, useState } from 'react';
import '../../App.css';
import { sendMessage } from '../../services/chatClient';

// PUBLIC_INTERFACE
export default function ChatPanel() {
  /** Docked chatbot panel */
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || busy) return;
    const next = [...messages, { role: 'user', text: trimmed }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const reply = await sendMessage(trimmed, messages);
      setMessages([...next, { role: 'bot', text: String(reply || '') }]);
    } catch (err) {
      setMessages([...next, { role: 'bot', text: 'Sorry, I could not process that request.' }]);
    } finally {
      setBusy(false);
      setTimeout(scrollToBottom, 0);
    }
  };

  return (
    <aside className="chat-panel" aria-label="Chatbot">
      <div className="card-header" style={{ padding: 12, borderBottom: '1px solid var(--border)' }}>
        Assistant
      </div>
      <div className="chat-messages" ref={listRef} aria-live="polite">
        {messages.map((m, idx) => (
          <div key={idx} className={`chat-bubble ${m.role === 'user' ? 'user' : 'bot'}`}>
            {m.text}
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={onSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={busy ? 'Sending...' : 'Ask about a patient, vitals, encounters...'}
          aria-label="Chat input"
          disabled={busy}
        />
        <button type="submit" className="btn btn-primary" disabled={busy} aria-label="Send message">
          {busy ? '...' : 'Send'}
        </button>
      </form>
    </aside>
  );
}
