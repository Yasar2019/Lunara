import { useEffect, useState } from 'react';
import api from '../services/api';

const SafetySettings = () => {
  const [blocked, setBlocked] = useState([]);
  const [targetId, setTargetId] = useState('');
  const [report, setReport] = useState({ userId: '', reason: '', details: '' });

  const loadBlocked = async () => {
    const { data } = await api.get('/safety/blocked');
    setBlocked(data.blockedUsers || []);
  };

  useEffect(() => {
    loadBlocked();
  }, []);

  const block = async () => {
    if (!targetId.trim()) return;
    await api.post(`/safety/block/${targetId.trim()}`);
    setTargetId('');
    await loadBlocked();
  };

  const submitReport = async (e) => {
    e.preventDefault();
    await api.post(`/safety/report/${report.userId}`, {
      reason: report.reason,
      details: report.details,
    });
    setReport({ userId: '', reason: '', details: '' });
    alert('Report submitted');
  };

  return (
    <main className="page stack">
      <div className="card">
        <h2>Block user</h2>
        <input placeholder="User ID" value={targetId} onChange={(e) => setTargetId(e.target.value)} />
        <button onClick={block}>Block</button>
      </div>
      <form className="card form" onSubmit={submitReport}>
        <h2>Report user</h2>
        <input placeholder="User ID" value={report.userId} onChange={(e) => setReport({ ...report, userId: e.target.value })} required />
        <input placeholder="Reason" value={report.reason} onChange={(e) => setReport({ ...report, reason: e.target.value })} required />
        <textarea placeholder="Details" value={report.details} onChange={(e) => setReport({ ...report, details: e.target.value })} />
        <button type="submit">Send report</button>
      </form>
      <div className="card">
        <h2>Blocked users</h2>
        <ul>
          {blocked.map((u) => (
            <li key={u._id}>{u.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default SafetySettings;
