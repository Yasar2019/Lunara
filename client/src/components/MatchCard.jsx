import { Link } from 'react-router-dom';

const MatchCard = ({ match, currentUserId }) => {
  const partner = match.users.find((u) => u._id !== currentUserId);

  if (!partner) return null;

  return (
    <div className="card match-card">
      <img src={partner.photos?.[0]} alt={partner.name} className="avatar" />
      <div>
        <h3>{partner.name} {partner.verified && <span className="badge">Verified</span>}</h3>
        <p>{partner.bio || 'Say hi and start the vibe.'}</p>
        <Link to={`/chat/${match._id}`} className="button-link">Open chat</Link>
      </div>
    </div>
  );
};

export default MatchCard;
