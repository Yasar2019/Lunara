import { useEffect, useRef, useState } from 'react';

const ChatBox = ({ messages, onSend, currentUserId }) => {
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onSend(text);
    setText('');
  };

  return (
    <div className="card chat-box">
      <div className="messages">
        {messages.map((m) => (
          <div key={m._id} className={`message ${m.sender === currentUserId ? 'mine' : ''}`}>
            {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={submit} className="chat-input-row">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
