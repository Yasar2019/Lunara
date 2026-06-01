import { useEffect, useState } from 'react';
import api from '../services/api';
import ProfileCard from '../components/ProfileCard';

const Discovery = () => {
  const [payload, setPayload] = useState({ profile: null, compatibility: 0, starters: [] });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/discovery');
      setPayload(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const action = async (type) => {
    if (!payload.profile) return;
    await api.post(`/discovery/${type}/${payload.profile._id}`);
    await load();
  };

  return (
    <main className="page">
      {loading ? <p className="center-text">Loading profiles...</p> : <ProfileCard {...payload} />}
      <div className="actions-row">
        <button onClick={() => action('pass')}>Pass</button>
        <button onClick={() => action('like')}>Like</button>
        <button onClick={() => action('superlike')}>Super Like</button>
      </div>
    </main>
  );
};

export default Discovery;
