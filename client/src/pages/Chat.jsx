import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
  const { matchId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);

  const load = async () => {
    const { data } = await api.get(`/messages/${matchId}`);
    setMessages(data.messages || []);
  };

  useEffect(() => {
    load();
  }, [matchId]);

  const send = async (text) => {
    await api.post(`/messages/${matchId}`, { text });
    await load();
  };

  return (
    <main className="page">
      <h2>Chat</h2>
      <ChatBox messages={messages} onSend={send} currentUserId={user?._id} />
    </main>
  );
};

export default Chat;
