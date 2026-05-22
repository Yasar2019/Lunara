import { useEffect, useState } from 'react';
import MatchCard from '../components/MatchCard';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Matches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    api.get('/matches').then(({ data }) => setMatches(data.matches || []));
  }, []);

  return (
    <main className="page">
      <h2>Your Matches</h2>
      <div className="stack">
        {matches.map((match) => (
          <MatchCard key={match._id} match={match} currentUserId={user?._id} />
        ))}
      </div>
    </main>
  );
};

export default Matches;
